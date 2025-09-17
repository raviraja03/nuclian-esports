/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadRoutesAndMiddleware = async function (app, apiVersion = "v1") {
    const modulesPath = path.join(__dirname, "../app", apiVersion).replace("v1", "");
    const modules = fs.readdirSync(modulesPath);
    
    for (const folderName of modules) {
        const preFix = `/api/${apiVersion}`;
        if (folderName === "v2") {
            await loadRoutesAndMiddleware(app, folderName);
            continue;
        }
        const fileName = modulesPath.includes("v2") ? "route.js" : `${folderName}.route.js`;
        const routeFileName = path.join(modulesPath, folderName, fileName);
        if (fs.existsSync(routeFileName)) {
            try {
                const routeModule = await import(pathToFileURL(routeFileName).href);
                app.use(preFix, routeModule.default);
            } catch (error) {
                console.error(`Error loading route ${routeFileName}:`, error);
            }
        }
    }
};

// const loadRoutesAndMiddleware = function (app, apiVersion = "v1") {
//     const baseModulesPath = path.join(__dirname, "../app");
//     const modules = fs.readdirSync(baseModulesPath);
    
//     modules.forEach((folderName) => {
//         const preFix = `/api/${apiVersion}`;
//         // Skip v2 logic for now
//         // if (folderName === "v2") return;

//         const fileName = `${folderName}.route.js`;

//         const routeFileName = path.join(baseModulesPath, folderName, fileName);
//         if (fs.existsSync(routeFileName)) {
//             app.use(preFix, require(routeFileName));
//         }

//         // const routeFilePath = path.join(baseModulesPath, folderName, routeFileName);
        
//         // if (fs.existsSync(routeFilePath)) {
//         //     try {
//         //         const { appRouter, adminRouter } = require(routeFilePath);
                
//         //         // Mount app routes at /api/v1
//         //         if (appRouter && (typeof appRouter === 'function' || appRouter.router)) {
//         //             app.use(`/api/${apiVersion}`, appRouter);
//         //         }
                
//         //         // Mount admin routes at /api/v1/admin
//         //         if (adminRouter && (typeof adminRouter === 'function' || adminRouter.router)) {
//         //             app.use(`/api/${apiVersion}/admin`, adminRouter);
//         //         }
//         //     } catch (error) {
//         //         console.error(`Error loading route ${routeFilePath}:`, error);
//         //     }
//         // }
//     });
// };

export {
    loadRoutesAndMiddleware
};
