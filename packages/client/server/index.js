"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const port = process.env.PORT || 80;
const clientPath = path_1.default.join(__dirname, '../client');
const isDev = process.env.NODE_ENV !== 'production';
async function createServer() {
    const app = (0, express_1.default)();
    app.get('*', async (req, res) => {
        res.send('Тут будет ssr');
    });
    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
}
createServer();
