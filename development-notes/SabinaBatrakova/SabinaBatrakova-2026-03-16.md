# Дата: 2026-03-16 (RU)

## Что было сделано

1) Рефакторинг: вынесла валидацию и маппинг ошибок в отдельный файл `validation.ts`, чтобы unit-тесты не зависели от env/Supabase.
2) Написала unit-тесты на `validateInputForm` и `getSupabaseErrorMessage`, настроила vitest alias `@`.
3) Поняла, что CI может падать на тестах из-за env-переменных Supabase.


## Планы (что дальше?)

Данный план я попросила сгенерировать AI.

1) Session persistence
Цель: после перезагрузки страница “помнит”, что пользователь залогинен.
В `shared/api/supabase/auth.api.ts` уже есть `apiGetSession()` (без параметров).
На старте приложения (например `src/app/init/initApp.ts` или временно в `main.ts`) вызвать:
- `const session = await apiGetSession()`

Сохранить session в одном месте (entities):
- `entities/session` или `entities/user`
- минимально: `setSession(session)` и `getSession()`

2) Logout
Цель: пользователь может выйти, сессия очищается.
В `shared/api/supabase/auth.api.ts` использовать `apiSignOut()`.
Добавить кнопку Logout на простой странице (например `/dashboard` или даже рядом с формой для теста).
При logout:
- `await apiSignOut()`
- `clearSession()` в entities
- редирект на `/login`

## Мысли

Самое простое, что можно было протестировать в моем коде, — это валидацию ввода данных: некорректная почта, слабый пароль, имя пользователя (не)обязательно, ошибки в случае иного текста с сервера.
Для тестов мне необходимы две функции: `validateInputForm()` и `getSupabaseErrorMessage()` в model.

В первом тесте я проверяю, чтобы имя не было пустым, не `undefined`: обязательно должно быть значение.
Во втором тесте, если неправильный username, выдаст ошибку, так как не подходит под regex.
В третьем тесте в signin не требуется username.
В четвертом тесте неверная почта — не соответствует regex.
В пятом тесте проверка пароля.
В шестом тесте в catch прилетает нестандартная строка, не `Error`, что ожидает ошибку.

После запуска словила ошибку: в Vite и в Vitest не мог разрешить алиас. В vitest config добавила:

```
import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
resolve: {
alias: {
"@": path.resolve(__dirname, "./src"),
},
},
test: {
environment: "jsdom",
},
});

import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
resolve: {
alias: {
"@": path.resolve(__dirname, "./src"),
},
},
test: {
environment: "jsdom",
},
});
```
Потом у меня повалился тест при проверке CI:
```
Missing env: VITE_SUPABASE_URL
падает при импорте src/shared/api/supabase/client.ts
```
Это происходит потому, что model.test.ts импортирует ../model, а model.ts импортирует @/shared/api/supabase/auth.api, тот тянет client.ts, а client.ts требует env. В CI env нет  и тесты падают ещё до выполнения тестов.

Нужно сделать так, чтобы unit-тесты не зависели от Supabase и env.

Самый простой вариант, как я поняла, это перенести validateInputForm() и getSupabaseErrorMessage() в отдельный файл validation.ts.

Таким образом тесты не трогают Supabase, и CI проходит тесты.



## Code Review

- [PR #24: feat: RSS-T-07_dashboard Analytics Dashboard Implementation](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/24#discussion_r2939182848) — 1 комментарии (написала про магические числа, их можно вынести в константы с именами для лучше читабельности кода.)
- [PR #24: feat: RSS-T-07_dashboard Analytics Dashboard Implementation](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/24#discussion_r2939218941) — 1 комментарий (Я не совсем поняла, для чего используется -> ! есть ли вариант замены в append без '!' ? wrapper.append(svg.node()!))

- [PR #26: feat: RSS-T-08 Add Tests page, Test Overview page and Test Run page#26](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/26#discussion_r2939396475) — 1 комментарий (Если вопросы имею тип допустим(один ответ/несколько ответов/просто текстом), то есть смысл добавить Union type, сделать строже, чтобы не было ошибок в логике и UI.)
- [PR #26: feat: RSS-T-08 Add Tests page, Test Overview page and Test Run page#26](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/26#discussion_r2939419001) — 1 комментарий (Можно передать ошибку в доступном виде для пользователя -> error.message)




## Date: 2026-03-16 (EN)
What was done?

1) Refactoring: I moved validation and error mapping into a separate validation.ts file so unit tests don’t depend on env/Supabase.

2) I wrote unit tests for validateInputForm and getSupabaseErrorMessage and configured the Vitest alias @.

3) I realized CI can fail on tests because of Supabase environment variables.

## Plans (what’s next?)

I asked AI to generate this plan.

1. Session persistence
Goal: after a page reload, the app “remembers” that the user is logged in.
In shared/api/supabase/auth.api.ts, there is already apiGetSession() (no params).
At app startup (e.g., src/app/init/initApp.ts or temporarily in main.ts) call:

- const session = await apiGetSession()

- Store the session in one place (entities):

- entities/session or entities/user

- minimum: setSession(session) and getSession()

2. Logout
Goal: the user can log out and the session is cleared.
In shared/api/supabase/auth.api.ts, use apiSignOut().
Add a Logout button on a simple page (e.g., /dashboard or even next to the form for testing).
On logout:

- await apiSignOut()

- clearSession() in entities

- redirect to /login

### Thoughts

The easiest thing to test in my code was input validation: invalid email, weak password, whether username is required or not, and errors in case a different server message is returned.
For tests, I need two functions: validateInputForm() and getSupabaseErrorMessage() in the model.

- In the first test, I check that the name is not empty and not undefined—it must have a value.
- In the second test, if the username is invalid, it returns an error because it doesn’t match the regex.
- In the third test, username is not required in signin.
- In the fourth test, the email is invalid—it doesn’t match the regex.
- In the fifth test, I check the password.
- In the sixth test, catch receives a non-standard string instead of an Error, which should still produce an error.

After running the tests, I got an error: Vite and Vitest couldn’t resolve the alias. In the Vitest config, I added:
```
import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
resolve: {
alias: {
"@": path.resolve(__dirname, "./src"),
},
},
test: {
environment: "jsdom",
},
});

import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
resolve: {
alias: {
"@": path.resolve(__dirname, "./src"),
},
},
test: {
environment: "jsdom",
},
});
```
Then my CI test check failed:
```
Missing env: VITE_SUPABASE_URL
fails when importing src/shared/api/supabase/client.ts
```
This happens because model.test.ts imports ../model, model.ts imports @/shared/api/supabase/auth.api, which pulls in client.ts, and client.ts requires env variables. In CI there is no env so tests fail even BEFORE running.

I need to make unit tests independent of Supabase and env.
The simplest option, as I understood it, is to move validateInputForm and getSupabaseErrorMessage into a separate file validation.ts.

This way tests don’t touch Supabase, and CI passes the tests.