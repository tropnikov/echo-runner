# Content Security Policy (CSP)

Настройка прокси и безопасности через Caddy для продакшена и разработки.
Поддержка строгих CSP в проде, разрешённых unsafe-\* в dev для Vite HMR.
Автоматический HTTPS в проде через Let’s Encrypt.

## 📁 Структура файлов

Caddyfile - Продакшен: строгая CSP, HSTS, HTTPS

Caddyfile.dev - Локальная разработка: разрешены unsafe-inline, unsafe-eval, ws://localhost:\* для Vite

docker-compose.yml - Продакшен: использует Caddyfile

docker-compose.dev.yml - Dev: использует Caddyfile.dev

## 🚀 Запуск

### Запуск dev-окружения (использует Caddyfile.dev)

docker compose -f docker-compose.dev.yml up -d --build
Доступ:

💡 Клиент: http://localhost

💡 API: http://localhost/api/v1/... (Caddy убирает /api/v1 → бэк получает /...)

🔄 Перезагрузка Caddy после правок конфига

#### Форматировать Caddyfile.dev

docker run --rm -v "$PWD/Caddyfile.dev:/etc/caddy/Caddyfile" caddy:2 caddy fmt --overwrite /etc/caddy/Caddyfile

#### Перезапустить Caddy

docker compose -f docker-compose.dev.yml restart caddy

### 🌐 Продакшен (домен + HTTPS)

Перед запуском:

Убедитесь, что DNS (A/AAAA) ведёт на сервер

Порты 80 и 443 открыты

bash
export APP_DOMAIN=echo-runner-51.ya-praktikum.tech
export EMAIL=admin@example.com

#### Запуск продакшена (использует Caddyfile)

docker compose up -d --build
🔄 Перезагрузка Caddy в проде
bash

#### Форматировать Caddyfile (с переменными окружения)

docker run --rm -e EMAIL=$EMAIL -v "$PWD/Caddyfile:/etc/caddy/Caddyfile" caddy:2 caddy fmt --overwrite /etc/caddy/Caddyfile

#### Перезапустить Caddy

docker compose restart caddy
🧪 Проверки
👨‍💻 Быстрые проверки (dev)
bash

#### Проверить CSP клиента

curl -sI http://localhost/ | grep -i content-security-policy

#### Проверить заголовки API

curl -sI http://localhost/api/v1/health | head -n 10
🌐 Проверки (prod)
bash

#### Проверить ключевые заголовки безопасности

curl -sI https://$APP_DOMAIN/ | grep -E "Content-Security-Policy|Strict-Transport|X-Content-Type|X-Frame-Options"

#### Проверить API

curl -sI https://$APP_DOMAIN/api/v1/health | head -n 10

## 🔐 Content Security Policy (CSP)

👨‍💻 Dev (localhost — клиент)
caddy
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
connect-src 'self' http://localhost:3000 http://localhost:3001 ws://localhost:\*;
img-src 'self' data: blob: https:;
worker-src 'self' blob:;
✅ Необходимо для работы Vite HMR, React Fast Refresh и т.п.

🌐 Prod (домен — клиент)
caddy
script-src 'self';
style-src 'self';
connect-src 'self' wss://{$APP_DOMAIN};
img-src 'self' data:;
✅ Без unsafe-inline и unsafe-eval — безопасно для продакшена.

🤖 API (везде — dev и prod)
caddy
default-src 'none';
base-uri 'none';
object-src 'none';
frame-ancestors 'none';
form-action 'none';
✅ Только для JSON API. Не отдаёт HTML — поэтому CSP максимально строгий.

## 🛠️ Частые команды

📜 Логи Caddy (dev)
bash
docker compose -f docker-compose.dev.yml logs -f caddy
📋 Список запущенных сервисов (dev)
bash
docker compose -f docker-compose.dev.yml ps
