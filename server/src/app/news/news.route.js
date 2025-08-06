const express = require('express');
const newsController = require('./news.controller');

const router = express.Router();

// Only public endpoints in this file
router.get('/', newsController.getAllNews);
router.get('/:slugOrId', newsController.getNewsBySlugOrId);

// Export routers for dynamic loading
module.exports = {
  appRouter: router
};
