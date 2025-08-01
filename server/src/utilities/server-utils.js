/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require("fs");
const path = require("path");

const loadRoutesAndMiddleware = function (app, apiVersion = "v1") {
    const baseModulesPath = path.join(__dirname, "../app");
    const modules = fs.readdirSync(baseModulesPath);
    
    modules.forEach((folderName) => {
        const preFix = `/api/${apiVersion}`;
        
        // Skip v2 logic for now
        if (folderName === "v2") return;
        
        const routeFileName = `${folderName}.route.js`;
        const routeFilePath = path.join(baseModulesPath, folderName, routeFileName);
        
        if (fs.existsSync(routeFilePath)) {
            try {
                const route = require(routeFilePath);
                if (typeof route === 'function' || route.router) {
                    app.use(preFix, route);
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