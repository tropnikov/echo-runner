## Отчет по 7-8 спринтам

[Яндекс Диск](https://disk.yandex.ru/i/F2NoqLX0vP1S6g)

## Как работать с проектом:

- Используем [Ant Design](https://ant.design/components/overview/)
- Используем css-модули (создаем файлы `Component.module.css`) или инлайн стили
- Если вам нужны брейкпоинты для медиа-запросов, используйте их из файла `@/helpers/breakpoints.css`:

  ```css
  @import '@/helpers/breakpoints.css';

  @media (--sm) {
    .component {
      /* styles */
    }
  }
  ```

- Храним компоненты в папке `src/components`, страницы в `src/pages`, общие типы в `src/types` и т.д. по смыслу
- Экспортируем компоненты по умолчанию
- Желательно установить плагины Prettier, Eslint, Stylelint для своей IDE
- При коммите запускается prettier, stylelint, eslint, проверка типов. Нужно исправить их ошибки для успешного коммита
- Для генерации апи и хуков RTK Query запустить `yarn generate-api`

## Порядок работы с git

Ветка `dev` – основная рабочая ветка, `main` – продакшн ветка

1. Клонируем проект
2. Создаем новую ветку от `dev` (вида `feature/ECH-6` или `fix/ECH-01`), туда коммитим
3. Когда все готово создаем PR из своей ветки в `dev`
4. Прикрепляем PR к задаче в Linear, задачу перемещаем в колонку `Needs review`
5. Проходим ревью
6. Вливаем в ветку `dev` (через squash & merge)
7. Сообщаем остальным, что задача вылита в `dev`

## Как запускать?

### Вариант 1: Docker (рекомендуется)

#### Предварительные требования
1. Установите [Docker Desktop](https://www.docker.com/products/docker-desktop/) для вашей ОС
2. Убедитесь, что Docker запущен и работает

#### Настройка переменных окружения
1. Создайте файл `.env` в корне проекта:
   ```bash
   yarn bootstrap
   ```
2. Замените `POSTGRES_HOST` в `.env.local` на `localhost`

#### Запуск приложения

**Development режим (с hot reload):**
```bash
docker compose -f docker-compose.dev.yml up --build
```

Или поднять только базу в докере:
```bash
docker compose -f docker-compose.dev.yml up postgres -d --build
yarn dev
```

**Production режим:**
```bash
docker compose up --build -d
```
3. Дождитесь завершения сборки (может занять несколько минут при первом запуске)
4. Проверьте статус контейнеров:
   ```bash
   # Для development
   docker compose -f docker-compose.dev.yml ps
   
   # Для production  
   docker compose ps
   ```
5. Дождитесь, пока все сервисы станут здоровыми (health check пройдет успешно)

#### Проверка работоспособности
После запуска проверьте доступность сервисов:
- **Клиент**: http://localhost:${CLIENT_PORT}
- **Сервер API**: http://localhost:${SERVER_PORT}

#### Доступ к приложению
После успешного запуска приложение будет доступно по адресам:
- **Клиент**: http://localhost:${CLIENT_PORT}
- **Сервер API**: http://localhost:${SERVER_PORT}
- **База данных**: localhost:${POSTGRES_PORT}

#### Полезные команды для работы с Docker
```bash
# Просмотр логов всех сервисов (dev)
docker compose -f docker-compose.dev.yml logs -f

# Просмотр логов конкретного сервиса (prod)
docker compose logs -f postgres
docker compose logs -f server
docker compose logs -f client

# Остановка всех сервисов
docker compose down                          # production
docker compose -f docker-compose.dev.yml down  # development

# Перезапуск конкретного сервиса
docker compose restart postgres

# Подключение к базе данных
docker compose exec postgres psql -U ${POSTGRES_USER} -d ${POSTGRES_DB}

# Полная очистка (удалит все данные БД)
docker compose down -v
```

#### Устранение неполадок
- **Если порты заняты**: Измените значения `CLIENT_PORT`, `SERVER_PORT`, `POSTGRES_PORT` в файле `.env`
- **Если контейнеры не запускаются**: Проверьте логи командой `docker compose logs`
- **Если нужно пересобрать образы**: Выполните `docker compose up --build -d`
- **Если нужно сбросить данные БД**: Выполните `docker compose down -v` и запустите заново
- **Если health check не проходит**: Подождите немного, сервисы могут инициализироваться до 1-2 минут

### Вариант 2: Локальная разработка

#### Предварительные требования
1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)

#### Запуск базы данных
Для локальной разработки нужно запустить только PostgreSQL контейнер:
```bash
docker compose up postgres -d
```

#### Запуск приложения
После запуска базы данных выполните одну из команд:

- **Запуск всего приложения**: `yarn dev`
- **Только клиент**: `yarn dev --scope=client`
- **Только сервер**: `yarn dev --scope=server`

#### Проверка работоспособности
После запуска проверьте доступность сервисов:
- **Клиент**: http://localhost:${CLIENT_PORT}
- **Сервер API**: http://localhost:${SERVER_PORT}
- **База данных**: localhost:${POSTGRES_PORT}

#### Полезные команды для локальной разработки
```bash
# Остановка базы данных
docker compose down postgres

# Просмотр логов базы данных
docker compose logs -f postgres

# Подключение к базе данных
docker compose exec postgres psql -U ${POSTGRES_USER} -d ${POSTGRES_DB}
```

## Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

## Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

## Линтинг

`yarn lint`

## Форматирование prettier

`yarn format`

## Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса

1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

## Документация

- [Игровой движок](./docs/gameEngine.md) - Описание игрового движка
- [Сценарий игры](./docs/scenario.md) - Разработка сценария игры
- [Утечки памяти](./docs/MEMORYLEAKS.md) - Утечки памяти
- [Защита от XSS](./docs/XSS_REPORT.md) - Защита от XSS
