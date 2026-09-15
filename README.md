# GameHost 2.0

Полностью рабочая регистрация и авторизация на Next.js + PostgreSQL.

## Что уже работает

- Главная страница на русском
- Регистрация пользователя
- Проверка email
- Проверка имени пользователя
- Хеширование пароля через bcrypt
- PostgreSQL
- Login
- HttpOnly cookie с сессией
- Logout
- `/api/auth/me`
- Защищённый dashboard
- Docker Compose для PostgreSQL

## 1. Требования

Node.js 20+ и Docker Desktop.

## 2. Запуск PostgreSQL

```bash
docker compose up -d
```

База:
- host: localhost
- port: 5432
- database: gamehost
- user: gamehost
- password: change_me

## 3. Создание `.env.local`

Скопируй `.env.example` в `.env.local`.

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

В `.env.local` обязательно задай:

```env
DATABASE_URL=postgresql://gamehost:change_me@localhost:5432/gamehost
AUTH_SECRET=сюда-длинный-случайный-ключ-минимум-32-символа
```

## 4. Создание таблицы

```bash
docker exec -i gamehost-postgres psql -U gamehost -d gamehost < sql/schema.sql
```

Если команда с `<` не работает в PowerShell:

```powershell
Get-Content .\sql\schema.sql -Raw | docker exec -i gamehost-postgres psql -U gamehost -d gamehost
```

## 5. Установка

```bash
npm install
```

## 6. Запуск

```bash
npm run dev
```

Открой:

http://localhost:3000

Регистрация:

http://localhost:3000/register

Вход:

http://localhost:3000/login

После успешной регистрации или входа пользователь попадает в:

http://localhost:3000/dashboard

## Важно

Это уже настоящая регистрация с PostgreSQL, а не `console.log`.
Пароли не сохраняются в открытом виде.

Для production позже нужно добавить rate limiting, email verification,
password reset, 2FA, CSRF/дополнительные security headers, Redis и
разделение API/worker/Node Agent.

## Если появляется `Can't resolve '@/...'`

В проект уже добавлена настройка `@/*` в `tsconfig.json`:

```json
"baseUrl": ".",
"paths": {
  "@/*": ["./*"]
}
```

Если у тебя уже была старая копия проекта, замени её этой версией и заново выполни:

```bash
rm -rf .next
npm install
npm run build
```

В Windows PowerShell вместо `rm -rf .next` можно:

```powershell
Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue
npm install
npm run build
```

## Точное подключение базы данных к Vercel

Важно: если сайт размещён на Vercel, `localhost:5432` там НЕ работает.
PostgreSQL должен находиться во внешнем облачном сервисе.

### Вариант: Neon PostgreSQL

1. Создай PostgreSQL проект в Neon.
2. Скопируй connection string вида:

```env
postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require
```

3. Открой SQL Editor в Neon и выполни полностью файл:

```text
sql/schema.sql
```

4. В Vercel открой:

```text
Project → Settings → Environment Variables
```

Добавь:

```text
DATABASE_URL = postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require
AUTH_SECRET = длинная_случайная_строка_минимум_32_символа
```

Добавь переменные для `Production`, а при необходимости также для `Preview` и `Development`.

5. После сохранения сделай Redeploy проекта.

### Как проверить базу

После запуска сайта открой `/register`, создай аккаунт.

В Neon SQL Editor:

```sql
SELECT id, username, email, created_at
FROM users
ORDER BY created_at DESC;
```

Если пользователь появился — база подключена правильно.

### Локальная разработка

Для локальной разработки можно использовать Docker из этого проекта:

```bash
docker compose up -d
```

`.env.local`:

```env
DATABASE_URL=postgresql://gamehost:change_me@localhost:5432/gamehost
AUTH_SECRET=замени-на-длинный-случайный-ключ
```

Затем:

```bash
Get-Content .\sql\schema.sql -Raw | docker exec -i gamehost-postgres psql -U gamehost -d gamehost
npm install
npm run dev
```

На Vercel Docker PostgreSQL из `docker-compose.yml` не используется — там используется облачная PostgreSQL через `DATABASE_URL`.

## Исправление ошибки bcryptjs

В этой версии добавлен `@types/bcryptjs` и локальное объявление типов, поэтому ошибка:

```text
Could not find a declaration file for module 'bcryptjs'
```

исправлена.
