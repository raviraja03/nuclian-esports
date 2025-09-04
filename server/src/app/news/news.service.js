const mongoose = require('mongoose');
const News = require('../../models/news.model');
const NewsCategory = require('../../models/newsCategory.model');

class NewsService {
    // Public news methods
    static async getPublishedNews(filters, pagination) {
        try {
            return await News.getPublished(filters, pagination);
        } catch (error) {
            throw new Error(`Error fetching published news: ${error.message}`);
        }
    }

    static async getNewsBySlugOrId(slugOrId) {
        const query = mongoose.Types.ObjectId.isValid(slugOrId)
            ? { _id: slugOrId }
            : { slug: slugOrId };

        return News.findOne({
            ...query,
            status: 'published',
            isDeleted: false
        }).populate('createdBy', 'name');
    }

    // Admin news methods
    static async createNews(newsData, userId) {
        try {
            const news = new News({
                ...newsData,
                createdBy: userId
            });
            return await news.save();
        } catch (error) {
            if (error.code === 11000 && error.keyPattern?.slug) {
                throw new Error('A news article with this headline already exists');
            }
            throw error;
        }
    }

    static async updateNews(id, updateData, userId) {
        const news = await News.findOne({ _id: id, isDeleted: false });
        if (!news) {
            throw new Error('News not found');
        }

        Object.assign(news, updateData, { updatedBy: userId });
        return news.save();
    }

    static async deleteNews(id, userId) {
        const news = await News.findOne({ _id: id, isDeleted: false });
        if (!news) {
            throw new Error('News not found');
        }

        news.isDeleted = true;
        news.updatedBy = userId;
        return news.save();
    }

    static async updateNewsStatus(id, newStatus, userId) {
        try {
            const news = await News.findOne({ _id: id, isDeleted: false });
            if (!news) {
                throw new Error('News not found');
            }

            if (!['draft', 'published', 'archived'].includes(newStatus)) {
                throw new Error('Invalid status value');
            }

            return await news.toggleStatus(newStatus, userId);
        } catch (error) {
            throw error.message === 'News not found' || error.message === 'Invalid status value'
                ? error
                : new Error(`Error updating news status: ${error.message}`);
        }
    }

    // Category methods
    static async createCategory(categoryData, userId) {
        try {
            const category = new NewsCategory({
                ...categoryData,
                createdBy: userId
            });
            return await category.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new Error('Category already exists');
            }
            throw error;
        }
    }

    static async getAllCategories() {
        return NewsCategory.find({ isActive: true })
            .select('name slug description')
            .sort('name');
    }

    static async deleteCategory(id) {
        const category = await NewsCategory.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }

        // Check if category is in use
        const newsWithCategory = await News.findOne({ 
            category: category.slug,
            isDeleted: false
        });

        if (newsWithCategory) {
            throw new Error('Category is in use and cannot be deleted');
        }

        category.isActive = false;
        return category.save();
    }

    // Tags methods
    static async getAllTags() {
        return News.getAllTags();
    }
}

module.exports = NewsService;
