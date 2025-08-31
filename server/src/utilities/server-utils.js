/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require("fs");
const path = require("path");

const loadRoutesAndMiddleware = function (app, apiVersion = "v1") {
    const baseModulesPath = path.join(__dirname, "../app");
    const modules = fs.readdirSync(baseModulesPath);
    
    modules.forEach((folderName) => {
        // Skip v2 logic for now
        if (folderName === "v2") return;

        const routeFileName = `${folderName}.route.js`;
        const routeFilePath = path.join(baseModulesPath, folderName, routeFileName);
        
        if (fs.existsSync(routeFilePath)) {
            try {
                const { appRouter, adminRouter } = require(routeFilePath);
                
                // Mount app routes at /api/v1
                if (appRouter && (typeof appRouter === 'function' || appRouter.router)) {
                    app.use(`/api/${apiVersion}`, appRouter);
                }
                
                // Mount admin routes at /api/v1/admin
                if (adminRouter && (typeof adminRouter === 'function' || adminRouter.router)) {
                    app.use(`/api/${apiVersion}/admin`, adminRouter);
                }
            } catch (error) {
                console.error(`Error loading route ${routeFilePath}:`, error);
            }
        }
    });
};

module.exports = {
    loadRoutesAndMiddleware
};