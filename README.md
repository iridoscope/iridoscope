# Иридоскоп

Приложение для проведения простейшего иридоанализа.

# Разработка

Для запуска веб-приложения в режиме разработки:

```
yarn
yarn run dev
```

Дождитесь пока оно завершит первоначальный запуск и затем пройдите по адресу [`http://localhost:1234`](http://localhost:1234).

<!-- To specify custom configuration options, one could create a file called `configuration/custom.json`. The contents of that file would be applied on top of the default configuration when running `yarn run dev` or `yarn run build`. -->

# Сборка

Для сборки веб-приложения в режиме веб-сайта:

```
yarn
yarn run build
```

Файлы сборки будут записаны в папку `build`:

* файл `index.html` — основная страница сайта.
* папка `assets` — всякие-разные файлы ("ресурсы") — `.js`/`.css`/`.map`/картинки — со случайно-сгенерированными именами.

После сборки содержимое папки `build` можно заливать на сайт: подойдёт простейший бесплатный "статический" хостинг.

## Аналитика

Чтобы добавить Гугл-Аналитику на сайт, выполните [сборку](#сборка) приложения, перейдите в папку `build`, откройте файл `index.html`, найдите там сверху строчку `var CONFIG = {}` и добавьте туда свойство `googleAnalyticsId`.

Пример:

```js
var CONFIG = {
  "googleAnalyticsId": "UA-123456789-1"
}
```

Где `UA-123456789-1` — это ID Гугл-Аналитики. После этого "залейте" сборку на сайт: пользовательская статистика будет показываться в Гугл-Аналитике.