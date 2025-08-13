"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const serialize_javascript_1 = __importDefault(require("serialize-javascript"));
const vite_1 = require("vite");
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const clientPath = path_1.default.join(__dirname, '../');
async function createServer() {
    const app = (0, express_1.default)();
    const viteServer = await (0, vite_1.createServer)({
        server: {
            middlewareMode: true,
        },
        root: clientPath,
        appType: 'custom',
        css: {
            devSourcemap: true,
        },
    });
    app.use(viteServer.middlewares);
    app.get('*', async (req, res, next) => {
        const url = req.originalUrl;
        try {
            let template = await promises_1.default.readFile(path_1.default.resolve(clientPath, 'index.html'), 'utf-8');
            const { render } = await viteServer.ssrLoadModule(path_1.default.join(clientPath, 'src/entry-server.tsx'));
            template = await viteServer.transformIndexHtml(url, template);
            const { antStyles, html: appHtml, helmet, initialState } = await render(req);
            let indexCss = '';
            try {
                const cssPath = path_1.default.resolve(clientPath, 'src/index.css');
                indexCss = await promises_1.default.readFile(cssPath, 'utf-8');
            }
            catch (error) {
                console.warn('Could not read CSS file:', error);
            }
            const allStyles = [indexCss ? `<style data-vite-dev-id="index.css">${indexCss}</style>` : '', antStyles ?? '']
                .filter(Boolean)
                .join('');
            const html = template
                .replace(`<!--ssr-helmet-->`, `${helmet.meta.toString()} ${helmet.title.toString()} ${helmet.link.toString()}`)
                .replace(`<!--ssr-styles-->`, allStyles)
                .replace(`<!--ssr-outlet-->`, appHtml)
                .replace(`<!--ssr-initial-state-->`, `<script>window.APP_INITIAL_STATE = ${(0, serialize_javascript_1.default)(initialState, {
                isJSON: true,
            })}</script>`);
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        }
        catch (error) {
            viteServer.ssrFixStacktrace(error);
            next(error);
        }
    });
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}
createServer();
