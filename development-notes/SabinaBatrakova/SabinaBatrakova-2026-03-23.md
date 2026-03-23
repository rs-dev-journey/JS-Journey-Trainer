# Дата: 2026-03-23 (RU)

## Что было сделано
Вчера я сфокусировалась на подготовке к интервью: повторила основные темы по JavaScript/TypeScript, прошлась по вопросам и задачам.

В итоге сдала на **10/10**.

## Мысли / Планы (что дальше?)
Хочу закрепить результат: выписать вопросы, которые встречались, и сделать небольшой список тем для повторения, чтобы не забыть.

Что касается моей фичи, сегодня я должна сделать:

1) Из `router.ts` убрать временные временные `example.ts`

2) Проверить руками:
- `/` открывается
- `/practice` без логина кидает на `/login`
- login ведёт на `/practice`
- reload на `/practice` сохраняет сессию
- неизвестный путь ведёт на 404
- `/tests/test-name`
- `/tests/test-name/run`
3) перенести navigare в папку shared что ребята тоже могли переиспользовать
4) Лера добавила настройки husky, надо сделать got pull на ветку dev
5) для чекпоинта 5 надо будет смержить все в ветку development чтобы по итогу увидеть как рендерится наше приложение, совместно с 404, loading, обработкой ошибок.
5) также спрошу  AI куда в роутере олучше втсавить функцию переключения тем, которую сделала Лера.
6) заняться второй фичей(создать страницу, расписать базовую логику)
Сегодня получилось коротко, так как надо много что успеть сдлеать

# Date: 2026-03-23 (EN)

## What was done
Yesterday I focused on interview preparation: I reviewed the main JavaScript/TypeScript topics and went over questions and tasks.

As a result, I passed with **10/10**.

## Thoughts / Plans (what’s next?)
I want to reinforce the result: write down the questions that came up and make a small list of topics to review so I don’t forget them.

As for my feature, today I need to:

1) Remove the temporary `example.ts` files from `router.ts`

2) Check manually:
- `/` opens
- `/practice` without login redirects to `/login`
- login leads to `/practice`
- reload on `/practice` keeps the session
- an unknown path leads to 404
- `/tests/test-name`
- `/tests/test-name/run`

3) Move `navigare` to the shared folder so the others can reuse it too

4) Lera added Husky settings, so I need to do a `git pull` from the `dev` branch

5) For checkpoint 5, we’ll need to merge everything into the `development` branch so that in the end we can see how our app renders together with 404, loading, and error handling

6) I’ll also ask AI where it would be best to place the theme-switching function in the router that Lera made

7) Start working on the second feature (create the page and outline the basic logic)

Today’s note is short because I need to get a lot done.