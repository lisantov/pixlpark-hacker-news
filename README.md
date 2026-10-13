# Pixlpark Hacker News

SPA-клиент [Hacker News](https://news.ycombinator.com/) на React с бесконечной лентой новостей, ручным обновлением, живым списком комментариев и деплоем на GitHub Pages.

Приложение живёт в папке [`frontend/`](./frontend) — это отдельный Vite-проект.
Хотел сделать monorepo с бэкендом на Express, но к сожалению времени маловато

[Задеплоенная версия](https://lisantov.github.io/pixlpark-hacker-news/)

## Возможности

- Три ленты новостей: **new / top / best** — переключаются селектом на главной странице.
- Пагинация через бесконечный скрол по 10 постов на страницу.
- Автообновление списков каждые 60 секунд.
- Кнопка **Обновить** — принудительный перезапрос постов.
- Плавающая кнопка **Показать новые посты** — подтягивает свежие посты сверху без потери пагинации.
- Страница новости: заголовок-ссылка, автор, дата, счётчик комментариев.
- Древовидные комментарии с раскрытием вложенных ответов, скелетоны при загрузке.
- Данные новости кэшируются одним запросом и переиспользуются лентой и страницей новости.
- Анимация появления карточек (каскад задержек).
- Unit-тесты ключевой логики (Vitest + Testing Library).

## Стек

| Слой | Технология |
| --- | --- |
| Язык | TypeScript 5 (strict) |
| UI | React 19, JSX, Tailwind CSS 4 |
| Сборка | Vite 8 |
| Данные | Tanstack Query 5 |
| Роутинг | React Router 5 |
| Тесты | Vitest, jsdom, @testing-library/react |

Пакетный менеджер: **yarn 4.18**

## Запуск

```bash
cd frontend
yarn install      # установка зависимостей
yarn dev          # dev-сервер с HMR на http://localhost:5173
yarn typecheck    # проверка типов (tsc)
yarn test         # unit-тесты (vitest run)
yarn test:watch   # тесты в watch-режиме
yarn build        # продакшн-сборка в dist/
yarn start        # локальный предпросмотр dist/ (vite preview)
```

### Переменные окружения

| Переменная | Значение по умолчанию | Назначение |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `https://hacker-news.firebaseio.com/v0/` | Базовый URL API |

## Деплой

`.github/workflows/deploy.yml` собирает приложение и публикует `frontend/dist` на GitHub Pages (пуш в `master` или вручную через `workflow_dispatch`).

Так как это SPA и в продакшене задан `base: "/pixlpark-hacker-news/"`, воркфлоу:

- ставит `dist/.nojekyll`;
- копирует `dist/index.html` → `dist/404.html`, чтобы глубокие ссылки (например `.../new-story/123`) отдавали HTML, и роутер сам выбирал страницу.

Роутер монтируется с `basename`, взятым из `import.meta.env.BASE_URL`, поэтому в дев-режиме (`/`) и на GitHub Pages (`/pixlpark-hacker-news/`) пути работают без изменений.

## Архитектура

Код организован по принципам Feature-Sliced Design:

```
frontend/
  index.html
  vite.config.ts / vitest.config.ts
  app/
    main.tsx                # createRoot + BrowserRouter(basename) + ErrorBoundary
    App.tsx                 # QueryClientProvider + маршруты (Switch)
    pages/                  # страницы: StoryListPage, StoryDetailPage, NotFoundPage
    widgets/                # DefaultLayout, Header, Footer
    features/               # storyList (лента, селект ленты), storyDetail (заголовок, комментарии)
    entities/               # story, comment: model — api — queries — keys
    shared/                 # api (http), lib (formatters, constants), ui (Button, Link, Loader)
    test/setup.ts           # vitest setup (jest-dom, cleanup)
```

Маршруты (`app/App.tsx`):

| Путь | Страница |
| --- | --- |
| `/` (exact) | `StoryListPage` — лента + селект вида новостей |
| `/:id` (exact) | `StoryDetailPage` — новость + комментарии |
| любой другой | `NotFoundPage` |

### Поток данных

Всё построено на React Query; на сетевой уровень ходит только `entities/*/api` через тонкий `http`-клиент.

- **Лента.** `useStoriesByType(type)` (в `entities/story/queries/story.queries.ts`) ходит в общий хук `useStoryFeed`:
  - `useQuery` — свежие id новостей для выбранной ленты (`story:new`, `story:top`, `story:best`);
  - `useInfiniteQuery` — постранично грузит детали постов через общий кэш `story:detail:<id>`;
  - детали пишутся в `detail(id)`-кэш одним источником, поэтому страница новости не делает повторных запросов;
  - `refresh()` и `applyNewPosts()` подставляют свежие посты в начало ленты через `queryClient.setQueryData`, не трогая скролл.
- **Комментарии.** `StoryCommentList` → `useCommentsGroup(ids)`, запрос `comment:<id1>,...` с `refetchInterval`; кнопка «Обновить список» инвалидирует все comment-запросы (`COMMENT_QUERY_KEYS.all`).
- **Сброс ленты.** При переключении типа ленты список рендерится с `key={type}`, чтобы сбросить внутренний `renderedIdsRef` (иначе пагинация тянула бы id предыдущей ленты).
