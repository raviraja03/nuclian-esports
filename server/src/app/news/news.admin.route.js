const express = require('express');
const adminController = require('./news.admin.controller');
const { validateObjectId, isAdmin } = require('../../middleware/newsMiddleware');

const router = express.Router();

// Admin endpoints
router.post('/', isAdmin, adminController.createNews);
router.put('/:id', isAdmin, validateObjectId('id'), adminController.updateNews);
router.delete('/:id', isAdmin, validateObjectId('id'), adminController.deleteNews);
router.patch('/:id/status', isAdmin, validateObjectId('id'), adminController.toggleNewsStatus);
router.post('/categories', isAdmin, adminController.createCategory);
router.get('/categories', adminController.getCategories);
router.delete('/categories/:id', isAdmin, adminController.deleteCategory);
router.get('/tags', adminController.getTags);

// Export admin router for dynamic loading
module.exports = {
  adminRouter: router
};
