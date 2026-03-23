# Дата: 2026-03-22 (RU)

## Что было сделано
На этой неделе я занималась своей  первой фичей login page. Сначала у меня была только базовая login/signup page, которая умела отправлять форму в Supabase и показывать сообщение об успешном входе или регистрации. Надо было еще чтобы полноценная авторизация в приложении включала хранение состояния пользователя, protected routes, logout и восстановление сессии после перезагрузки страницы.

Первой проблемой было то, что login page рендерилась напрямую из main.ts, поэтому router и глобальная auth-логика вообще не участвовали в работе приложения.
Из-за этого было невозможно нормально реализовать переходы между страницами и проверку доступа. Я вынесла запуск приложения в app-слой: main.ts теперь только подключает стили, создаёт #app и вызывает startApp, а в app/index.ts происходит initAuth() и запуск router.

Отдельно я сделала auth-state модуль в entities/user. Там хранится текущий пользователь и состояние загрузки, а также есть функции для инициализации авторизации, проверки isAuthenticated() и logout. Это было важно, потому что авторизация нужна не только login page, а всему приложению. Я поняла, что хранить состояние пользователя внутри страницы логина было бы неправильным решением.

Следующая сложность была в том, как реализовать protected routes. Я сделала собственный router на history.pushState() и popstate. Для статических маршрутов вроде /login, /practice, /dashboard, /tests я использовала объект маршрутов, а для динамических путей тестов (/tests/:testName и /tests/:testName/run) — разбор URL на сегменты через split('/').filter(Boolean). Так router умеет определять, какую страницу открыть, даже если путь не совпадает с заранее прописанной строкой.

Я также столкнулась с проблемой, что login page “не открывается”, потому что меня сразу редиректило на /practice. Позже я поняла, что проблема не в самой странице, а в том, что после прошлых входов в браузере оставалась сессия, и initAuth() восстанавливал пользователя. Тогда роутер корректно считал, что авторизованному пользователю не нужно показывать /login. Это помогло мне лучше понять разницу между удалением пользователя в Supabase и logout в самом приложении: если не очистить локальную сессию, приложение всё равно будет считать пользователя залогиненным.

Для login submit flow я добавила логику: после успешного signin вызывается initAuth(), затем navigate('/practice'). Это позволило связать форму с общим auth-state и protected routes. Для signup я пока оставила более простой сценарий — успешное сообщение, без автоматического входа.

Ещё один вопрос был связан с архитектурой по FSD. Header и другие UI-слои не должны зависеть от app, поэтому я отдельно продумывала, как лучше организовать навигацию. Также во время локальной разработки возникла проблема, что router не собирался, потому что страницы моих ребят по команде еще не смержины. Чтобы не трогать их index.ts и не создавать конфликтов, я сделала временные example.ts страницы, которые позволили проверить router и auth flow локально.

Что я вынесла из этой работы: я намного лучше поняла, что авторизация это не просто форма логина, а целый сложный пока что для меня цикл приложения. Я научилась думать о пользователе не только в момент submit формы, но и в сценариях переходов, перезагрузки, восстановления сессии и ограничения доступа. Самой сложной частью оказалось не сверстать login page, а связать её с router, auth-state и session restore так, чтобы всё работало как единый организм.

## Планы (что дальше?)
Мне надо пройти интервью, я очень переживаю.
Потом надо будет смержить мою ветку в development связать все зависимсоти, исправить конфликты.
Очень хочется успеть сделать вторую фичу


### Date: 2026-03-22 (EN)
What was done

This week I worked on my first feature — the login page. At first, I only had a basic login/signup page that could submit the form to Supabase and show a success message for sign-in or registration. But a complete authorization flow in the app also needed user state storage, protected routes, logout, and session restoration after a page reload.

The first issue was that the login page was rendered directly from main.ts, so the router and global auth logic were not involved in the app at all. Because of that, it was impossible to properly implement navigation between pages and access checks. I moved the app startup into the app layer: now main.ts only imports styles, creates #app, and calls startApp, while app/index.ts runs initAuth() and starts the router.

Separately, I created an auth-state module in entities/user. It stores the current user and loading state, and provides functions for auth initialization, checking isAuthenticated(), and logout. This was important because authorization is needed not only for the login page but for the whole application. I realized that keeping user state inside the login page would be the wrong approach.

The next challenge was implementing protected routes. I built my own router using history.pushState() and the popstate event. For static routes like /login, /practice, /dashboard, and /tests, I used a routes object. For dynamic test paths (/tests/:testName and /tests/:testName/run), I parsed the URL into segments with split('/').filter(Boolean). This way, the router can decide which page to open even when the path doesn’t match a predefined string.

I also ran into a situation where the login page “wouldn’t open” because I was immediately redirected to /practice. Later I realized the issue wasn’t the page itself — it was because a session from previous logins was still stored in the browser, and initAuth() restored the user. Then the router correctly assumed that an authenticated user shouldn’t see /login. This helped me better understand the difference between deleting a user in Supabase and logging out in the application itself: if you don’t clear the local session, the app will still consider the user logged in.

For the login submit flow, I added logic so that after a successful sign-in, initAuth() is called and then navigate('/practice') runs. This connected the form to the shared auth-state and protected routes. For signup, I kept a simpler scenario for now — just a success message without automatic sign-in.

Another question was related to FSD architecture. The header and other UI layers shouldn’t depend on the app layer, so I separately thought through how to organize navigation in a better way. During local development, I also faced an issue where the router wouldn’t build because my teammates’ pages hadn’t been merged yet. To avoid touching their index.ts files and creating conflicts, I made temporary example.ts pages that allowed me to test the router and auth flow locally.

What I took from this work: I now understand much better that authorization is not just a login form, but a full application cycle that is still complex for me. I learned to think about the user not only at the moment of submitting the form, but also in navigation scenarios, reloads, session restoration, and access restrictions. The hardest part wasn’t building the login page UI — it was connecting it to the router, auth-state, and session restore so everything works as a single organism.

### Plans (what’s next?)

I need to pass the interview, and I’m very nervous.
After that, I’ll need to merge my branch into development, connect all dependencies, and resolve conflicts.
I really want to manage to implement the second feature in time.