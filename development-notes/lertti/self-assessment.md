# 🚀 Event Loop Master - Async Sorter
An interactive educational platform designed to master JavaScript's asynchronous
nature. Users solve execution order puzzles while watching a real-time visualization of
the Event Loop engine.
## 🌟 Key Features
- **Async Sorter Engine**: Interactive drag-and-drop quiz to sort code execution order.
- **Event Loop Visualizer**: Real-time animation of Call Stack, Web API, Microtask, and
Macrotask queues.
- **Dynamic Dashboard**: Interactive D3.js circular charts and progress tracking.
- **Fullstack Integration**: Custom Node.js backend for task management and persistent
stats.
- **ThemeSwitcher**: Seamless Light/Dark mode support (in Header Component).
## 🛠 Tech Stack
- **Frontend**: TypeScript, D3.js (Data Visualisation),
Vitest/Cypress (Testing).
- **Backend**: Native Node.js HTTP Server (No Frameworks), File System DB.
- **Architecture**: **Feature-Sliced Design (FSD)**.
## 📊 Evaluation Criteria & Points (Total: 210)
### 🏗 Architecture & DevOps (Total: 50)
- **FSD Layers implementation** (+10): Clear separation between Widgets, Features,
Entities, and Shared.
- **API Layer** (+10): Isolated API clients in `api` layer.
- **Design Patterns** (+10):   
  - **Adapter**: Used for transforming raw API data into D3.js compatible formats.
  - **Command**: Encapsulated visualization steps into objects for the Event Loop Engine.
  - **Singleton**: Implemented for the AudioService to manage a single AudioContext instance.
- **Testing** (+20): Approximately 50% of the newly added logic (API layers, utility functions, and core services) is covered by Unit tests (Vitest).
### 💻 My Components (Total: 120)
- **Complex Widget (Async Sorter)** (+25): Advanced logic with state-driven rendering.
- **Event Loop Engine** (+25): A specialized asynchronous engine for real-time priority queue visualization.
- **Rich UI Screen (Dashboard)** (+20): Interactive statistics dashboard featuring D3.js animations and `ResizeObserver`.
- **Rich UI Screen (Profile/Header)** (+20): Complex header logic handling authentication state, navigation, and user settings.
- **Custom Backend** (+30): Fullstack **Node.js** server using **SQLite** for persistent data storage
### 🎨 UI & Interaction (Total: 40)
- **Drag & Drop** (+10): Native Drag & Drop implementation for sorting  code execution lines.
- **Theme Switcher** (+10): Global theme state with CSS variables and `localStorage`.
- **Advanced Animations** (+10): Smooth transitions and Event Loop flow visualization.
- **Audio Feedback** (+5): Web Audio API integration for UI sounds.
- **Adaptive Layout** (+5): Responsive design using `min()`, `clamp()`, and CSS Grid for cross-device compatibility.

### Links to PR:

- [Dashboard Component](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/24)
- [Error State Reusable Component](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/39)
- [Loader Reusable Component](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/31)
- [404 Page](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/33)
- Header Component: [main](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/29), [add logo](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/47)
- [Async Sorter Component](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/53)

## 🚀 Отчет о разработке: Глубокая интеграция и архитектурные вызовы
В дополнение к техническим характеристикам и всему описанному, я хочу подробнее остановиться на ключевых узлах системы, которые потребовали наибольших усилий и «ручной» работы.  
#### 🏗 Архитектурный вызов: Feature-Sliced Design (FSD)
Самым сложным и трудозатратным процессом стало строгое следование методологии **FSD**. Разделение логики на слои (Shared, Entities, Features, Widgets) отнимало **огромное количество времени**, так как требовало постоянного контроля зависимостей.
 - **Сложность**: Было критически важно избегать циклических импортов и следить за тем, чтобы «глупые» компоненты Shared не знали ничего о бизнес-логике Widgets.
 - **Результат**: Несмотря на сложность, это позволило создать идеально чистую структуру, где API-клиенты полностью изолированы, а данные передаются через строго типизированные адаптеры.  

### 🧭 **Интеллектуальный Header: Управление состоянием и UI**
**Header** в моем проекте — это не просто навигационная панель, а полноценный управляющий центр:
- **Динамическая навигация**: Реализована бесшовная навигация по всему SPA-приложению. Состояние активных ссылок обновляется синхронно с роутером.  
- **Theme Switcher и работа с SVG**: Реализована плавная смена тем (Light/Dark). При переключении меняется не только палитра, но и **фон всего приложения**, а также **заполнение (fill/stroke) сложных SVG-иконок**, что потребовало глубокой проработки CSS-переменных и детального узучения "внутренностей" SVG изображений.  
   - **Сложность**: Я вручную разбирала структуру иконок и внедряла CSS-класс непосредственно в теги `<path>`.
   - **Результат**: Это позволило динамически менять не только общую палитру и фон приложения, но и точечно управлять цветами (`fill` и `stroke`) отдельных элементов иконок через CSS-переменные. При переключении темы иконки «оживают» и меняют вид синхронно с интерфейсом.
- **Audio Control**: Интегрировано управление звуком. Хедер напрямую взаимодействует с `AudioService` (Singleton), позволяя мгновеннопереключать состояние (Mute/Unmute).
- **Auth State**: Состояние хедера меняется в зависимости от авторизации пользователя, отображая аватар, имя пользователя или *Explorer*, еслиданные из Supabase не пришли.
- **Navigation & Auth**: Реализована бесшовная навигация по SPA. Состояние хедера (аватар пользователя, активные ссылки) динамически меняется в зависимости от авторизации и текущего роута.

### 📊 Dashboard: Борьба за точность данных
Реализация правильного SQL-запроса для статистики стала одной из самых сложных задач бэкенда:
- **Проблема**: База данных накапливала десятки записей. Обычные запросы выдавали «кашу» из старых и новых попыток. Мне нужно было реализовать логику «чистого прохождения»: если пользователь решил начать курс заново с первой задачи, прогресс должен отображать только последние данные.
- **Решение**: Я разработала SQL-логику, которая автоматически находит **точку старта** — момент последнего решения самой первой задачи (`visual-task-1`). Программа динамически отсекает все предыдущие записи и считает прогресс, начиная только от этой временной метки до текущего момента.
 - **Результат**: Теперь Dashboard показывает **честный прогресс** lдля Async Sorter — от первой задачи до последней решенной. Если пользователь начинает новый круг, система это понимает и корректно обновляет графики **D3.js**.
 
 ### 🧩 Сложность интеграции разнородных данных (Adapter Pattern)
Одной из главных архитектурных трудностей стала необходимость объединить в одном Dashboard данные из **несвязанных источников**:  
- **Сложность**: Мой бэкенд возвращал прогресс в виде числа успешных задач из сессии, в то время как данные по тестам приходили в виде массивов со сложной структурой (ID тестов, проценты прохождения, даты). Напрямую передать эти «сырые» данные в графики D3.js было невозможно.
- **Решение — Паттерн Адаптер**: Чтобы Dashboard оставался универсальным, я разработала систему **адаптеров**. Это специальные функции-преобразователи, которые приводят любые внешние данные (будь то ответ от моего Node.js сервера или данные коллеги из Supabase) к единому стандарту `ActivityData`.
 - **Результат**: Благодаря адаптерам, Dashboard не знает, откуда пришли данные. Он просто получает стандартизированный объект и мгновенно отрисовывает его. Это позволило легко связать мой кастомный бэкенд с общим интерфейсом статистики, сохранив чистоту архитектуры FSD.

### 🐫 Async Sorter: 
Работа над Сортером объединила в себе сложную асинхронную логику и нативный **Drag & Drop**:
- **Сложность**: Главным вызовом было связать нативный **Drag & Drop** с движком визуализации **Event Loop**. Нужно было не просто позволить пользователю менять элементы местами, а в реальном времени синхронизировать порядок этих «слотов» с алгоритмом приоритетов очередей (Call Stack, Microtasks, Macrotasks).
- **Решение**: Создан **State-driven интерфейс**, где состояние задачи является единственным источником правды. Это позволило добиться бесшовной связи между действиями игрока и реакцией движка.
- **Результат**:  Все игровые данные (время, попытки, подсказки) сохраняются в базе данных **SQLite**. Для их визуализации я реализовала функцию-посредник `getAsyncSorterResult` в слое **Entities**. Она через асинхронный `fetch` запрашивает у сервера уже агрегированный результат, объединяет его с актуальной длиной плейлиста и возвращает готовый объект. Это позволяет **Dashboard** оставаться «легким»: он не делает вычислений, а просто получает итоговые цифры и мгновенно отрисовывает их через графики **D3.js**.

### 🧩 Секретная страница 404: Интерактивная пасхалка
Я решила превратить стандартную страницу ошибки в интерактивную мини-игру, чтобы удержать пользователя, даже если он сбился с пути. Главная особенность в том, что страница полностью адаптируется под **глобальную тему** приложения, которая была установлена пользователем ранее.  
- **Игровая механика**: На странице реализована простая, но затягивающая игра на клики (Clicker). В зависимости от выбранной темы приложения, меняется и главный герой: в светлой теме пользователь «охотится» за **Верблюдами** 🐫, а в тёмной — за **Медузами**.
- **Связь с темой**: Страница считывает настройки темы, установленные пользователем ранее в Хедере. В зависимости от этого выбора, при инициализации страницы мгновенно устанавливается соответствующий фон и подгружается нужный SVG-персонаж. То же происходит и с компонентами **Error State** и **Loader**.
- **Результат**: Это превращает обычный «тупик» 404 в интерактивную пасхалку 🐫✨, которая сохраняет целостность дизайна всего приложения и развлекает пользователя.

## 📈 Итог
Этот проект стал для меня проверкой на выносливость в вопросах архитектуры. Я научилась не просто писать код, а проектировать масштабируемые системы, где бэкенд на чистом Node.js и фронтенд на TS/D3.js работают как единый механизм, соблюдая строгие правила типизации и архитектурных границ.

