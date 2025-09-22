Файлы

Caddyfile — prod (строгая CSP, HSTS, без inline/eval).

Caddyfile.dev — dev/localhost (разрешены inline/eval/ws для Vite HMR).

Запуск
Dev (localhost)

# читаем именно Caddyfile.dev

docker compose -f docker-compose.dev.yml up -d --build

# форматнуть и перечитать конфиг при правках

docker run --rm -v "$PWD/Caddyfile.dev:/etc/caddy/Caddyfile" caddy:2 caddy fmt --overwrite /etc/caddy/Caddyfile
docker compose -f docker-compose.dev.yml restart caddy

Открывать:

Клиент: http://localhost (через Caddy)

API: http://localhost/api/v1/... (Caddy режет префикс → у бэка путь без /api/v1)

Быстрые проверки:

curl -sI http://localhost/ | grep -i content-security-policy
curl -sI http://localhost/api/v1/health | head

Prod (домен)

# нужно: A/AAAA DNS → сервер, открыты 80/443

export APP_DOMAIN=echo-runner-51.ya-praktikum.tech
export EMAIL=admin@example.com

docker compose up -d --build

# форматнуть при правках

docker run --rm -e EMAIL=$EMAIL -v "$PWD/Caddyfile:/etc/caddy/Caddyfile" caddy:2 caddy fmt --overwrite /etc/caddy/Caddyfile
docker compose restart caddy

Проверки:

curl -sI https://$APP_DOMAIN/ | grep -E "Content-Security-Policy|Strict-Transport|X-Content-Type|X-Frame-Options"
curl -sI https://$APP_DOMAIN/api/v1/health | head

CSP (кратко)

Dev (client): script-src 'self' 'unsafe-inline' 'unsafe-eval', style-src 'self' 'unsafe-inline', connect-src ... ws://localhost:\*, img-src 'self' data: blob: https:.

Prod (client): без 'unsafe-inline'/'unsafe-eval'; connect-src 'self' https://$APP_DOMAIN wss://$APP_DOMAIN.

API (везде): строгая заглушка: default-src 'none'; ... form-action 'none';.

Частые команды

# логи Caddy

docker compose -f docker-compose.dev.yml logs -f caddy

# список сервисов

docker compose -f docker-compose.dev.yml ps
