const express = require('express');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const newsRoutes = require('./news.route');
const adminRoutes = require('./admin.routes');

// Create a limiter for public routes
const newsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

module.exports = (app) => {
    // Apply security middleware
    app.use('/api/news', xss());
    app.use('/api/news', newsLimiter);

    // Apply routes
    app.use(newsRoutes);
    app.use(adminRoutes);
};
