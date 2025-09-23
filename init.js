import fs from 'fs';

fs.copyFileSync('.env.sample', '.env');
fs.copyFileSync('.env.sample', '.env.local');

// Создаем директории для bind mounts
fs.mkdirSync('tmp/pgdata', { recursive: true });
fs.mkdirSync('tmp/pgdata_dev', { recursive: true });
fs.mkdirSync('tmp/pgadmin_data', { recursive: true });
fs.mkdirSync('tmp/pgadmin_dev_data', { recursive: true });
