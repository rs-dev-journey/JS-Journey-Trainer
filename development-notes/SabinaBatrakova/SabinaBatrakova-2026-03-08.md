## Дата: 2026-03-08 (RU)

Сегодня, 2026-03-08, я продолжаю работу над своей первой фичей login page.

## Что было сделано

С какими ошибками я столкнулась:
1) у меня не работал submit: инпуты не были внутри form, и я не задала `name = 'username/email/password'`;
2) была всплывающая подсказка браузера вместо моих ошибок — отключила с помощью `noValidate = true`;
3) ошибка в validate — перепутала объект данных и объект ошибок: `data.username` и `errors.username`.

Добавила функцию `addFirstLetterCapitalize`, которая на blur делает первую букву заглавной.
Ошибки теперь отображаются под каждым инпутом в соответствии с валидацией по каждому полю.
Если пустая строка — выводится, что поле обязательно; если есть несоответствие по условию — выводится ошибка.

Записала видео -> [link](https://youtu.be/D5c1xZltZwU)

## Мысли / Планы (что дальше?)

Завтра планирую начать подключать Supabase, сделать API для авторизации.

---

## Date: 2026-03-08 (EN)

Today, 2026-03-08, I continue working on my first feature — the login page.

## What was done

The issues I ran into:
1) my submit didn’t work: the inputs were not inside a form, and I didn’t set `name = 'username/email/password'`;
2) the browser’s built-in tooltip appeared instead of my errors — I disabled it using `noValidate = true`;
3) a validation issue — I mixed up the data object and the errors object: `data.username` and `errors.username`.

I added the `addFirstLetterCapitalize` function, which capitalizes the first letter on blur.
Now errors are displayed under each input according to the validation rules for each field.
If the string is empty, it shows that the field is required; if the value doesn’t match a condition, it shows an error.

I recorded a video -> link

## Thoughts / Plans (what’s next?)

Tomorrow I plan to start connecting Supabase and create an API for authorization.