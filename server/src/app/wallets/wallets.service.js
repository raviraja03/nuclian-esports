const Wallet = require('../../models/wallet.model.js');
const mongoose = require('mongoose');

class WalletService {
    /**
     * Find or create wallet for user
     */
    static async findOrCreateWallet(userId) {
        try {
            return await Wallet.findOrCreateWallet(userId);
        } catch (error) {
            throw new Error(`Error finding/creating wallet: ${error.message}`);
        }
    }

    /**
     * Get wallet balance
     */
    static async getWalletBalance(userId) {
        try {
            const wallet = await Wallet.findOne({ userId, isActive: true });
            if (!wallet) {
                throw new Error('Wallet not found');
            }
            return {
                userId: wallet.userId,
                coins: wallet.coins,
                isActive: wallet.isActive
            };
        } catch (error) {
            throw error.message === 'Wallet not found' 
                ? error 
                : new Error(`Error fetching wallet balance: ${error.message}`);
        }
    }

    /**
     * Credit wallet with funds
     */
    static async creditWallet(userId, amount, coins, description = '', metadata = {}) {
        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
            const wallet = await Wallet.findOne({ userId, isActive: true }).session(session);
            if (!wallet) {
                throw new Error('Wallet not found or inactive');
            }

            const transaction = wallet.creditWallet(amount, coins, description, metadata);
            await wallet.save({ session });
            
            await session.commitTransaction();
            return {
                wallet: {
                    userId: wallet.userId,
                    coins: wallet.coins,
                    isActive: wallet.isActive
                },
                transaction: transaction.toObject()
            };
        } catch (error) {
            await session.abortTransaction();
            throw error.message === 'Wallet not found or inactive'
                ? error
                : new Error(`Error crediting wallet: ${error.message}`);
        } finally {
            session.endSession();
        }
    }

    /**
     * Debit wallet with funds
     */
    static async debitWallet(userId, coins, description = '', metadata = {}) {
        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
            const wallet = await Wallet.findOne({ userId, isActive: true }).session(session);
            if (!wallet) {
                throw new Error('Wallet not found or inactive');
            }

            const transaction = wallet.debitWallet(0, coins, description, metadata);
            transaction.status = 'completed'; // Debit transactions are immediately completed
            await wallet.save({ session });
            
            await session.commitTransaction();
            return {
                wallet: {
                    userId: wallet.userId,
                    coins: wallet.coins,
                    isActive: wallet.isActive
                },
                transaction: transaction.toObject()
            };
        } catch (error) {
            await session.abortTransaction();
            throw error.message.includes('Insufficient') || error.message === 'Wallet not found or inactive'
                ? error
                : new Error(`Error debiting wallet: ${error.message}`);
        } finally {
            session.endSession();
        }
    }

    /**
     * Complete a pending transaction
     */
    static async completeTransaction(transactionId, newStatus = 'completed') {
        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
            const wallet = await Wallet.findOne({ 
                'transactionHistory._id': transactionId 
            }).session(session);
            
            if (!wallet) {
                throw new Error('Transaction not found');
            }

            const transaction = wallet.completeTransaction(transactionId, newStatus);
            await wallet.save({ session });
            
            await session.commitTransaction();
            return {
                wallet: {
                    userId: wallet.userId,
                    coins: wallet.coins,
                    isActive: wallet.isActive
                },
                transaction: transaction.toObject()
            };
        } catch (error) {
            await session.abortTransaction();
            throw error.message === 'Transaction not found'
                ? error
                : new Error(`Error completing transaction: ${error.message}`);
        } finally {
            session.endSession();
        }
    }

    /**
     * Get paginated transaction history
     */
    static async getTransactions(userId, filters = {}, pagination = { page: 1, limit: 10 }) {
        try {
            const wallet = await Wallet.findOne({ userId });
            if (!wallet) {
                throw new Error('Wallet not found');
            }

            let transactions = wallet.transactionHistory;

            // Apply type filter
            if (filters.type) {
                transactions = transactions.filter(t => t.type === filters.type);
            }

            // Sort by creation date (newest first)
            transactions = transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Apply pagination
            const total = transactions.length;
            const startIndex = (pagination.page - 1) * pagination.limit;
            const endIndex = startIndex + pagination.limit;
            const paginatedTransactions = transactions.slice(startIndex, endIndex);

            return {
                transactions: paginatedTransactions,
                pagination: {
                    current: pagination.page,
                    limit: pagination.limit,
                    total,
                    pages: Math.ceil(total / pagination.limit)
                }
            };
        } catch (error) {
            throw error.message === 'Wallet not found'
                ? error
                : new Error(`Error fetching transactions: ${error.message}`);
        }
    }

    /**
     * Get single transaction
     */
    static async getSingleTransaction(userId, transactionId) {
        try {
            const wallet = await Wallet.findOne({ userId });
            if (!wallet) {
                throw new Error('Wallet not found');
            }

            const transaction = wallet.transactionHistory.id(transactionId);
            if (!transaction) {
                throw new Error('Transaction not found');
            }

            return transaction.toObject();
        } catch (error) {
            throw error.message.includes('not found')
                ? error
                : new Error(`Error fetching transaction: ${error.message}`);
        }
    }

    /**
     * Update transaction description (admin only)
     */
    static async updateTransactionDescription(transactionId, description) {
        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
            const wallet = await Wallet.findOne({
                'transactionHistory._id': transactionId
            }).session(session);

            if (!wallet) {
                throw new Error('Transaction not found');
            }

            const transaction = wallet.transactionHistory.id(transactionId);
            transaction.description = description;
            await wallet.save({ session });

            await session.commitTransaction();
            return transaction.toObject();
        } catch (error) {
            await session.abortTransaction();
            throw error.message === 'Transaction not found'
                ? error
                : new Error(`Error updating transaction description: ${error.message}`);
        } finally {
            session.endSession();
        }
    }

    /**
     * Reverse a transaction (admin only)
     */
    static async reverseTransaction(transactionId, adminId) {
        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
            const wallet = await Wallet.findOne({
                'transactionHistory._id': transactionId
            }).session(session);

            if (!wallet) {
                throw new Error('Transaction not found');
            }

            const reverseTransaction = wallet.reverseTransaction(transactionId, adminId);
            await wallet.save({ session });

            await session.commitTransaction();
            return {
                wallet: {
                    userId: wallet.userId,
                    coins: wallet.coins,
                    isActive: wallet.isActive
                },
                reverseTransaction: reverseTransaction.toObject()
            };
        } catch (error) {
            await session.abortTransaction();
            throw error.message.includes('not found') || error.message.includes('Insufficient')
                ? error
                : new Error(`Error reversing transaction: ${error.message}`);
        } finally {
            session.endSession();
        }
    }

    /**
     * Update wallet status (admin only)
     */
    static async updateWalletStatus(userId, isActive) {
        try {
            const wallet = await Wallet.findOne({ userId });
            if (!wallet) {
                throw new Error('Wallet not found');
            }

            wallet.isActive = isActive;
            await wallet.save();

            return {
                userId: wallet.userId,
                coins: wallet.coins,
                isActive: wallet.isActive
            };
        } catch (error) {
            throw error.message === 'Wallet not found'
                ? error
                : new Error(`Error updating wallet status: ${error.message}`);
        }
    }
}

module.exports = WalletService;
