# Дата: 2026-03-05 (RU)

Сегодня, 2026-03-05, я продолжаю работу над своей первой фичей login page.

## Что было сделано

### 1. Создала ветку от ветки разработки development -> feat/RSS-T-06-login

Зафиксировала правила:
- Каждый ведет свою фичу в своей ветке.
- Не забывать подтягивать development в свою ветку в случае важных изменений.
- Не забывать делать коммиты, когда готовы логические блоки кода.

### 2. Оформила скелет FSD по фиче

```
src/
  /pages
    /auth
      Index.ts
      Ui.ts
      Model.ts

Features
  /auth
    /login
      Model.ts
      Index.ts

Entities
  /user
    Index.ts
    Types.ts
    Module.ts
```

Сегодня написала базовую форму для авторизации. Сперва набросала классический код на JS со всеми createElement. Такой код, конечно, занимает много строк. Потом адаптировала через TS, добавила типы (type InputForm), с которыми удобнее далее было заполнять поля с почтой, именем и паролем. Для отображения работы кнопки Submit добавила функцию submitForm, благодаря которой все данные, введенные в input, отображаются в console. Разбила код по FSD: в ui — рендеринг формы, в model — логика submit, index — связка ui + model.

Также я первый раз попробовала писать код с использованием помощника createElement (код, который заменяет более длинную запись на короткую). Поначалу было сложно понять, но в итоге удобно.

Планирую создать одну страницу с переключением вход <-> регистрация.
Сравнила варианты: если сделать разные страницы либо одну.
На данном этапе лучше одну, так как меньше проблем с роутингом, также проще сделать стиль для одной страницы. По клику проще сделать отображение на странице через style.display = 'block' или 'none'.
В Supabase предварительно планирую сохранять: id, email, name.

### Мысли / Планы (что дальше?)

На этой неделе, Week 3, хочу доделать рендеринг login и signup:

- в pages/auth дописать экран, добавить табы, error;

- в features/auth прописать действия входа и регистрации;

- в entities/user прописать логику, кто залогинен (session).

Постараюсь подключить Supabase.
Также надо записать видео моего кода.
Ежедневно подготовка к интервью.

### Date: 2026-03-05 (EN)

Today, 2026-03-05, I continue working on my first feature — the login page.

What was done
Created a branch from the development branch: development -> feat/RSS-T-06-login

I documented the rules:
- Everyone develops their feature in their own branch.
- Don’t forget to pull development into your branch in case of important changes.
- Do NOT forget to make commits when logical blocks of code are ready.

Prepared the FSD skeleton for the feature
```
src/
  /pages
    /auth
      Index.ts
      Ui.ts
      Model.ts

Features
  /auth
    /login
      Model.ts
      Index.ts

Entities
  /user
    Index.ts
    Types.ts
    Module.ts
```
Today I wrote a basic authorization form. First, I drafted classic JS code using createElement everywhere. This kind of code, of course, takes many lines. Then I adapted it to TS and added types (type InputForm), which made it easier to fill in fields for email, name, and password. To demonstrate how the Submit button works, I added a submitForm function so that all the data entered into the inputs is shown in the console. I split the code according to FSD: ui contains the form rendering, model contains the submit logic, and index connects ui + model.

I also tried writing code for the first time using a createElement helper (code that replaces a longer notation with a shorter one). At first it was hard to understand, but in the end it turned out to be convenient.

I plan to create a single page with a switch: login <-> registration.
I compared the options: separate pages versus one.
At this stage, one page is better because there are fewer routing issues, and it’s also easier to style a single page. On click, it’s simpler to toggle the view using style.display = 'block' or 'none'.
In Supabase, I plan to store: id, email, name.

### Thoughts / Plans (what’s next?)

This week, Week 3, I want to finish the rendering for login and signup:

- in pages/auth, finish the screen and add tabs, error;

- in features/auth, implement the login and registration actions;

- in entities/user, implement the logic for who is logged in (session).

I will try to connect Supabase.
I also need to record a video of my code.
Daily interview preparation.