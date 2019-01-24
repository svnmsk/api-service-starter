# API service
REST сервис.
## Требования
1. Node.js v10.4.1 или выше
2. MongoDB v3.2 или выше
3. [PM2](http://pm2.keymetrics.io/) (менеджер процессов)

## Установка зависимостей
```bash
npm i
```
## Миграции
Для реализации миграций используется пакет [migrate-mongoose](https://github.com/balmasi/migrate-mongoose)
Пример получения списка миграций:
```bash
./node_modules/.bin/migrate -d mongodb://localhost/kyc list
```
-d  - строка подключения к БД

Доступны следующие команды: list, up, down

> Ещё один способ миграции - использовать готовый скрипт. Для его использования, из корневой папки, выполните команду:
> ```bash
> NODE_ENV=production node ./scripts/migrate
> ```
> Установите параметр **"NODE_ENV"** в зависимости от окружения (production, development, test)

## Запуск тестов
```
npm run test
```

## Запуск
#### Разработка
Для разработки используется пакет [nodemon](https://github.com/remy/nodemon). Для запуска выполнить команду:
```bash
npm run dev
```
#### Использование
На сервере приложение запускается под управление менеджера процессов PM2. Для запуска выполнить команду:
```bash
npm run prod
```