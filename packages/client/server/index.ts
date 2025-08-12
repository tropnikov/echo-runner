import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const port = process.env.PORT || 80;

async function createServer() {
  const app = express();

  app.get('*', async (req, res) => {
    res.send('Тут будет ssr');
  });

  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
}

createServer();
