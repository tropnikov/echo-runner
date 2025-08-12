"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const vite_1 = require("vite");
dotenv_1.default.config();
const port = process.env.PORT || 80;
const clientPath = path_1.default.join(__dirname, '../');
const isDev = process.env.NODE_ENV !== 'production';
async function createServer() {
    const app = (0, express_1.default)();
    const viteServer = await (0, vite_1.createServer)({
        server: {
            middlewareMode: true,
        },
        root: clientPath,
        appType: 'custom',
    });
    app.get('*', async (req, res, next) => {
        const url = req.originalUrl;
        try {
            let template = await promises_1.default.readFile(path_1.default.resolve(clientPath, 'index.html'), 'utf-8');
            template = await viteServer.transformIndexHtml(url, template);
            const { render } = await viteServer.ssrLoadModule(path_1.default.join(clientPath, 'src/entry-server.tsx'));
            const appHtml = render();
            const html = template.replace(`<!--ssr-outlet-->`, appHtml);
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        }
        catch (error) {
            viteServer.ssrFixStacktrace(error);
            next(error);
        }
    });
    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
}
createServer();
