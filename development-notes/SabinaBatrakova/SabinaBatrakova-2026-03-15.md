# Дата: 2026-03-15 (RU)

## Что было сделано

1) Сделала страницу логина с двумя табами Sign Up / Sign In, чтобы не делать 2 страницы с роутингом.
2) Сверстала простой layout: фон-картинка + текстовый блок слева и форма справа.
3) В UI создала `createInputForm`, чтобы не дублировать код полей.
4) В UI добавила заглавную букву имени по blur, кнопку `disabled` в `model.ts`.
5) Реализовала валидацию: ошибки под каждым полем; `username` проверяется только в режиме Sign Up, email и пароль проверяются всегда.
6) Подключила Supabase через API layer: `apiSignUp` / `apiSignIn`; ошибки Supabase отображаются в понятные сообщения и рендерятся в UI.
7) Создала отдельный файл для валидации, чтобы тесты не зависели от env Supabase.
8) Написала 5 тестов на `validateInputForm` и `getSupabaseErrorMessage`, настроила vitest alias `@`.

## Планы (что дальше?)

Надо еще сделать logout, доступ только авторизованным пользователям на дашборд и практику, и доделать сохранение сессии.

## Мысли

Всю неделю было не до дневника.
Я понимаю, что мне очень сложно дается логическое выстраивание. Также мне ментор дал рекомендацию по моим предыдущим проектам — делать функции короче.
На этой неделе я прошла все стадии функции >50 строк, до разбивки на множество мелких.
Также мой сокомандник дал мне рекомендации, что можно исправить в коде, спасибо Жене. А именно: переименовать переменные (const PASSWORD -> в const PASSWORD_REGEX), вынести в переменные:

```ts
const username = data.username.trim();
const email = data.email.trim();
const password = data.password.trim();
```

для лучшей читательности кода. Также предложил разделить на отдельные функции по работе с ошибками.

Какие были проблемы?
1) Проблема с renderLoginPage()

Первая проблема -  функция renderLoginPage() разрослась и сигналилила красным цветом, что вызвало у меня небольшой стресс)). Совладав со своей и так расшатанной нервной системой, я решила разбить эту функцию на несколько небольших и потом собирать все в единую систему по частям.
```
export function renderLoginPage(root: HTMLElement) {
  const { container, authBlock } = createLoginLayout();
  const {
    form,
    buttonSubmitForm,
    status,
    serverError,
    nameInput,
    emailInput,
    passwordInput,
    getActiveTab,
  } = createAuthForm();

  authBlock.append(form);
  root.append(container);

  const handler = createSubmitHandler(
    {
      username: nameInput.errorMessage,
      email: emailInput.errorMessage,
      password: passwordInput.errorMessage,
    },
    { submitButton: buttonSubmitForm, statusElement: status, serverErrorElement: serverError },
    getActiveTab,
  );
  form.addEventListener('submit', handler);
}
```

В этой функции оставила лишь сборку отображения createLoginLayout() и createAuthForm(), и handler — createSubmitHandler.
Создала отдельные функции на создание формы с отображением серверных ошибок и статуса.
Создала отдельно функцию для инпутов.
Создала отдельную функцию для кнопки submit.
Создала отдельную функцию для табов.
Собрала это все в createAuthForm(), также добавила активный таб.

2) Подключение Supabase и API

Установила пакет supabase, потом добавила файл env, внесла данные по URL и ключу, создала папку в shared/api — client.ts. В этом документе создаю клиента: можно брать только конкретные ключи; если переменная не задана или пустая, то падает ошибка. Этот supabase потом используется в auth.api.ts.

В этой же папке создала файл auth.api.ts. В этом файле: apiSignUp (новый пользователь), apiSignIn (вход в существующий аккаунт); это еще не сделано: apiSignOut (выход из аккаунта), apiGetSession (проверка на залогиненность).

Дальше в models прописала логику использования apiSignUp / apiSignIn, добавила переключатель getActiveTab: () => 'signup' | 'signin'.

## Date: 2026-03-15 (EN)
What was done

I made a login page with two tabs, Sign Up / Sign In, so I wouldn’t need to create two separate pages with routing.

I built a simple layout: a background image + a text block on the left and the form on the right.

In the UI, I created createInputForm to avoid duplicating field code.

In the UI, I added capitalizing the first letter of the name on blur, and a disabled button state in model.ts.

I implemented validation: errors under each field; username is validated only in Sign Up mode, while email and password are always validated.

I connected Supabase via the API layer: apiSignUp / apiSignIn; Supabase errors are converted into clear messages and rendered in the UI.

I created a separate validation file so tests don’t depend on the Supabase env.

I wrote 5 tests for validateInputForm and getSupabaseErrorMessage, and configured the Vitest alias @.

## Plans (what’s next?)

I still need to implement logout, restrict access to the dashboard and practice pages to authorized users only, and finish session persistence.

## Thoughts

All week I didn’t have time for the diary.
I understand that logical structuring is very difficult for me. Also, my mentor recommended (based on my previous projects) that I make my functions shorter.
This week I went through all stages of having a function >50 lines long and then splitting it into many smaller ones.
My teammate also gave me recommendations on what can be improved in the code—thanks, Zhenya. Specifically: rename variables (change const PASSWORD to const PASSWORD_REGEX) and extract into variables:

const username = data.username.trim();
const email = data.email.trim();
const password = data.password.trim();

for better readability. He also suggested splitting the error-handling logic into separate functions.

What problems did I have?
1) Problem with renderLoginPage()

The first problem was that the renderLoginPage() function grew too large and was highlighted in red, which caused me a bit of stress)). With my already shaky nervous system, I decided to split this function into several smaller ones and then assemble everything into a single system step by step.
```
export function renderLoginPage(root: HTMLElement) {
  const { container, authBlock } = createLoginLayout();
  const {
    form,
    buttonSubmitForm,
    status,
    serverError,
    nameInput,
    emailInput,
    passwordInput,
    getActiveTab,
  } = createAuthForm();

  authBlock.append(form);
  root.append(container);

  const handler = createSubmitHandler(
    {
      username: nameInput.errorMessage,
      email: emailInput.errorMessage,
      password: passwordInput.errorMessage,
    },
    { submitButton: buttonSubmitForm, statusElement: status, serverErrorElement: serverError },
    getActiveTab,
  );
  form.addEventListener('submit', handler);
}
```

In this function, I left only the UI assembly via createLoginLayout() and createAuthForm(), and the handler — createSubmitHandler.
I created separate functions to build the form with server errors and status display.
I created a separate function for inputs.
I created a separate function for the submit button.
I created a separate function for tabs.
I assembled all of this into createAuthForm() and also added the active tab.

2) Connecting Supabase and the API

I installed the Supabase package, then added an env file, filled in the URL and key values, and created a folder in shared/api — client.ts. In this file, I create the client: only specific keys can be used; if a variable is missing or empty, an error is thrown. This Supabase client is then used in auth.api.ts.

In the same folder, I created auth.api.ts. This file contains: apiSignUp (new user) and apiSignIn (sign in to an existing account); these are not done yet: apiSignOut (sign out) and apiGetSession (check whether the user is logged in).

Next, in models I implemented the logic for using apiSignUp / apiSignIn, and added a tab switcher: getActiveTab: () => 'signup' | 'signin'.