# Date: 2026-02-27 (RU/EN)

Сегодня (2026-02-26) я планирую заниматься CI/CD. Хочу разобраться с установкой, по плану изучить документацию, посмотреть видео, как это работает в реальных проектах. Вечером допишу, получилось или нет.

Вечер, 22:00 - получилось! Я счастлива!

---

Today (2026-02-26) I plan to work on CI/CD. I want to figure out the setup: according to the plan, I’ll read the documentation and watch videos to see how it works in real projects. In the evening, I’ll add whether it worked out or not.

Evening, 22:00 - it worked! I’m happy!

---

## Что было сделано / What was done

Коротко по работе с установкой CI + CD.
С чего я начала изучение?

- <https://docs.github.com/ru/actions/tutorials/create-an-example-workflow>
- видео на YouTube
- попросила GPT расписать пошаговый план подключения CI + CD

В итоге что получилось:

1. Создала ветку от ветки разработки - у нас она **development**.
2. Создала в корне папку **.github/workflows** и файл **ci.yml**.
3. В **ci.yml** прописала, при каких `on` должна автоматически запускаться сборка: **push** на **development** и **PR** на **development**.
4. Проверила, какие у нас скрипты для запуска проверок (**Lint / Format / Test / Build**), уточнила у ребят, у кого какая версия **Node (22)**.
5. Запушила в ветку, открыла **Actions**, и на тесте проверка сломалась. В итоге написала тест, внесла пару строк в **tsconfig**, так как были проблемы с отсутствием в `types` `"vitest/globals"`.
6. Снова запушила изменения: тест прошёл, но сломался **build**. Начала читать, что же не так. Причина: TypeScript не подключил стандартную библиотеку, где описан тип **Disposable**. В `json` добавила `"ESNext.Disposable"`. Проблема ушла. Закоммитила изменения, запушила.
7. Checks CI стал зелёным! Вау!
8. Через несколько часов перешла к настройке **CD** на **Netlify**. Настройка заняла минут 20, наверное.
9. Добавила в **README** ссылку на наш проект и добавила бейдж (раньше не знала, что так можно — очень удобно; это мне подсказал GPT).
10. Ребята посмотрели, заапрувили, без замечаний.

Мне очень понравилось это небольшое путешествие - погружение в integration и delivery. Когда я первый раз начала работать с git, меня пугали вкладки, в том числе **Actions**: непонятно было, что и как применять. После данного опыта установки и использования на практике понимаешь, сколько всего ещё не знаешь: глубина бесконечна, главное — иметь запас кислорода и не отключиться по пути.

**Часть FSD**
Прочитала статью про **FSD** (архитектурная методология разработки фронтенд-приложений). Изучила, как строится иерархия из слоёв, слайсов и сегментов:

- **App** — всё, благодаря чему приложение запускается: роутинг, точки входа, глобальные стили, провайдеры и т. д.
- **Pages (страницы)** — полные страницы или большие части страницы при вложенном роутинге.
- **Widgets (виджеты)** — большие самодостаточные куски функциональности или интерфейса, обычно реализующие целый пользовательский сценарий.
- **Features (фичи)** — повторно используемые реализации целых фич продукта, то есть действий, приносящих бизнес-ценность пользователю.
- **Entities (сущности)** — бизнес-сущности, с которыми работает проект, например `user` или `product`.
- **Shared** — переиспользуемый код, особенно когда он отделён от специфики проекта/бизнеса, хотя это не обязательно.

Женя написал для нас структуру проекта, чтобы каждый понимал, в какой папке и файлах необходимо писать свои фичи и общие участки кода проекта. Сегодня мы ознакомляемся со структурой, думаю, что скоро начнём писать фичи.

---

A quick summary of working on setting up CI + CD.  
Where I started:

- <https://docs.github.com/ru/actions/tutorials/create-an-example-workflow>
- videos on YouTube
- I asked GPT to outline a step-by-step plan for connecting CI + CD

What I ended up with:

1. I created a branch from the development branch (ours is called **development**).
2. I created the **.github/workflows** folder in the root and added **ci.yml**.
3. In **ci.yml**, I defined which `on` events should trigger the build automatically: a **push** to **development** and a **PR** to **development**.
4. I checked which scripts we use for checks (**Lint / Format / Test / Build**) and confirmed with the team which **Node (22)** version they use.
5. I pushed the branch, opened **Actions**, and the test check failed. In the end, I wrote a test and added a couple of lines to **tsconfig** because `types` was missing `"vitest/globals"`.
6. I pushed the changes again: tests passed, but the **build** failed. I started reading what was wrong. The reason: TypeScript didn’t include the standard library where the **Disposable** type is defined. I added `"ESNext.Disposable"` to the `json`. The problem went away. I committed and pushed.
7. CI checks turned green! Wow!
8. A few hours later, I moved on to setting up **CD** on **Netlify**. It took about 20 minutes, I think.
9. I added a link to our project in the **README** and added a badge (I didn’t know you could do that before—very convenient; GPT suggested it).
10. The team reviewed it, approved it, and had no comments.

I really enjoyed this little journey—diving into integration and delivery. When I first started working with git, the tabs (including **Actions**) scared me: it wasn’t clear what to do and how to apply it. After this setup experience and using it in practice, you realize how much you still don’t know: the depth is endless, the main thing is to have enough oxygen and not pass out along the way.

**FSD part**
I read an article about **FSD** (an architectural methodology for frontend application development). I studied how the hierarchy is built from layers, slices, and segments:

- **App** — everything that makes the application run: routing, entry points, global styles, providers, etc.
- **Pages** — full pages or large parts of a page in nested routing.
- **Widgets** — large, self-contained pieces of functionality or UI, usually implementing an entire user scenario.
- **Features** — reusable implementations of product features, i.e., actions that bring business value to the user.
- **Entities** — business entities the project works with, e.g., `user` or `product`.
- **Shared** — reusable code, especially when separated from project/business specifics (though that’s not mandatory).

Zhenya wrote the project structure for us so everyone understands which folders and files should contain their features and the shared parts of the project. Today we’re getting familiar with the structure; I think we’ll start writing features soon.

---

## Мысли / Планы - Thoughts / Plans

Дальше надо будет написать на бумажке архитектуру своей фичи, понять логику взаимодействия и раскидать по папкам необходимые файлы. Также нам с ребятами надо будет определиться с UI (SASS): что и как будем использовать.

В целом мне нравится работать в команде — очень полезный опыт. Спасибо, RSS!💚

---

Next, I need to sketch the architecture of my feature on paper, understand the interaction logic, and distribute the necessary files across the folders. Also, the team and I need to decide on the UI (SASS): what and how we will use it.

Overall, I like working in a team—it’s very useful experience. Thanks, RSS! 💚