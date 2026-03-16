Testing
Фреймворк: vitest

Как запустить
npm test

Участники
@SabinaBatrakova

Что тестирую: unit-тесты на `validateInputForm` и `getSupabaseErrorMessage`


## Файл/описание

| Файл | Описание |
|---|---|
| `js-journey-trainer/src/pages/auth/__tests__/model.test.ts` | Набор тестов покрывает следующие случаи:<br><br>- `username` обязателен и не должен быть пустым или `undefined`;<br>- некорректный `username` не проходит проверку по `regex`;<br>- в сценарии `signin` поле `username` не требуется;<br>- `email` не проходит валидацию, если не соответствует ожидаемому формату;<br>- пароль проверяется на соответствие требованиям;<br>- функция корректно обрабатывает случай, когда в `catch` попадает не `Error`, а строка. |

PR с тестами: https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/25