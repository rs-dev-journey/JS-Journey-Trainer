# Date: 2026-03-01

## RU

Сегодня, 2026-03-01, я занималась изучением структуры FSD под свою фичу Login page.

## Что было сделано

Написала первоначальные метрики моей фичи по реализации страницы логина и регистрации:

1. Открываю страницу → пытаюсь зайти на `/practice` → перенаправляюсь на `auth`, необходимо пройти регистрацию.
2. Регистрируюсь → ввожу имя и email → попадаю в приложение.
3. Обновляю страницу → сессия сохраняется.
4. Также необходим будет `logout`.

Что касается FSD: открываю папку `pages` → создаю папку `/login` → далее создаю `index.ts`, в котором делаю экспорт отрисовки UI.
В папке `entities` создаю объект `user`.
В папке `features` создаю блоки для дальнейшей возможности переиспользования данной фичи.
С папкой `widgets` я пока до конца не разобралась: пока что поняла, что там должны быть основные внешние блоки — `header`, `footer`.

## Мысли / Планы (что дальше?)

Разобраться с Supabase: как подключить авторизацию.
План: написать хотя бы часть фичи и записать видео о том, как всё взаимосвязано и работает.

---

## EN (translation)

Today, 2026-03-01, I studied the FSD structure for my feature — the Login page.

## What was done

I wrote initial metrics for implementing the login and registration page:

1. I open the page → try to go to `/practice` → get redirected to `auth`, and I need to complete registration.
2. I register → enter my name and email → get into the app.
3. I refresh the page → the session is preserved.
4. I also need a `logout`.

Regarding FSD: I open the `pages` folder → create the `/login` folder → then create `index.ts`, where I export the UI rendering.
In the `entities` folder, I create a `user` entity.
In the `features` folder, I create blocks so this feature can be reused later.
I’m not fully confident about the `widgets` folder yet, but so far I understand it should contain the main outer blocks like the `header` and `footer`.

## Thoughts / Plans (what’s next?)

Figure out Supabase authorization: how to connect it.
Plan: implement at least part of the feature and record a video explaining how everything is connected and works.