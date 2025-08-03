
const express = require('express');
const User = require('../../models/User');

// Create separate routers for app and admin
const appRouter = express.Router();
const adminRouter = express.Router();

// ============= App Routes =============
appRouter.use(
    "/users",
    appRouter.get('/checking', async(req, res) => {
        res.json("hello World!!!!!!!!!!!");
    })
);


// Get user profile
appRouter.get('/users/profile', async(req, res) => {
    try {
        // TODO: Get user from auth middleware
        const userId = req.user?.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user profile
appRouter.put('/users/profile', async(req, res) => {
    try {
        // TODO: Get user from auth middleware
        const userId = req.user?.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { name, email, phone } = req.body;
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ============= Admin Routes =============
// Get all users (Admin only)
adminRouter.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single user (Admin only)
adminRouter.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: 'User not found' });
    }
});

// Create user (Admin only)
adminRouter.post('/users', async (req, res) => {
    try {
        const { name, email, phone, role } = req.body;
        const user = await User.create({ name, email, phone, role });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update user (Admin only)
adminRouter.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { name, email, phone, role } = req.body;
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (role) user.role = role;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete user (Admin only)
adminRouter.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.deleteOne();
        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = { appRouter, adminRouter };


// import express from 'express';
// import {
//   register,
//   login,
//   getAllUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
//   getProfile
// } from './user.controller.js';
// import authMiddleware from '../../middleware/errorMiddleware.js'; // Adjust if you have a real auth middleware

// const router = express.Router();

// // Registration route
// router.post('/register', register);

// // Login route
// router.post('/login', login);

// // Get user profile (protected)
// router.get('/profile', authMiddleware, getProfile);

// // CRUD routes
// router.get('/', getAllUsers);
// router.get('/:id', getUserById);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

// export default router;
