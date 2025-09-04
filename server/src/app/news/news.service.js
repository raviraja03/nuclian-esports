const mongoose = require('mongoose');
const News = require('../../models/news.model');
const NewsCategory = require('../../models/newsCategory.model');
const { StatusCodes } = require('../../config/status-codes');

class NewsService {
    // Public methods
    static async getPublishedNews(filters, pagination) {
        return News.getPublished(filters, pagination);
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

    // Admin methods
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
        const news = await News.findById(id);
        if (!news || news.isDeleted) {
            throw new Error('News not found');
        }

        Object.assign(news, updateData, { updatedBy: userId });
        return news.save();
    }

    static async deleteNews(id, userId) {
        const news = await News.findById(id);
        if (!news || news.isDeleted) {
            throw new Error('News not found');
        }

        news.isDeleted = true;
        news.updatedBy = userId;
        return news.save();
    }

    static async updateNewsStatus(id, status, userId) {
        const news = await News.findById(id);
        if (!news || news.isDeleted) {
            throw new Error('News not found');
        }

        return news.toggleStatus(status, userId);
    }

    // Category methods
    static async createCategory(categoryData, userId) {
        const category = new NewsCategory({
            ...categoryData,
            createdBy: userId
        });
        return category.save();
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

        category.isActive = false;
        return category.save();
    }

    static async getAllTags() {
        return News.getAllTags();
    }
}

module.exports = NewsService;
