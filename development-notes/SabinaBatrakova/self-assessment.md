# Self-Assessment

Ссылка на PR с self-assessment: [PR #54](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/54)

## Personal Features

В рамках проекта я реализовала две основные feature components:

1. Authentication flow с использованием Supabase
2. True/False widget для практики вопросов

Дополнительно я участвовала в реализации router уровня приложения, который обеспечивает защищенные маршруты и связывает authentication с остальными страницами приложения.

Основной фокус был на создании понятной архитектуры, разделении ответственности между слоями и разработке переиспользуемых компонентов.

## FEATURE 1:
## Authentication flow (Supabase) + Router

### Ссылки на PR
- Login / Authentication + Router: [PR #25](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/25)
- Доработка login page: [PR #48](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/48)

Реализована система регистрации и входа пользователя с использованием Supabase (BaaS).

Фича обеспечивает:

- регистрацию пользователя
- login/logout
- сохранение username в metadata
- восстановление сессии после reload страницы
- доступ к данным пользователя из других частей приложения
- защиту приватных страниц через router

Authentication интегрирован с router, который контролирует доступ к защищенным страницам приложения.

### Цель фичи - создать единый источник данных пользователя и централизованно управлять доступом к страницам приложения.

## Таблица баллов -> Authentication flow (Supabase) + Router

| Категория      | Описание                                   | Баллы |
|----------------|--------------------------------------------|------:|
| Rich UI Screen | страница логина с состояниями и валидацией | 20 |
| BaaS Auth      | регистрация и авторизация через Supabase   | 15 |
| API Layer      | выделенный слой работы с Supabase          | 10 |

### **Итого: 45 баллов**


### Flow работы авторизации


-> Регистрация пользователя: пользователь вводит email, password и username.
-> Форма валидирует данные: корректность email, минимальную длину пароля, наличие username

-> При регистрации username сохраняется в metadata Supabase пользователя.

-> После успешного login создается session, содержащая:

    id пользователя
    email
    username

-> Сессия автоматически восстанавливается после перезагрузки страницы через initAuth.

-> Состояние пользователя хранится в entities/user и доступно через публичные функции:

    getAuthState

    getCurrentUserId

-> Router использует данные авторизации для определения доступа к страницам приложения.

-> Если пользователь не авторизован:
происходит redirect на страницу login.

-> Если пользователь уже авторизован:
происходит redirect с /login на /practice.

-> Router также обрабатывает /404.



### Дополнительно реализован router приложения, который:

-> хранит конфигурацию маршрутов
-> разделяет публичные и защищенные страницы
управляет redirect логикой
отображает header только на нужных страницах
поддерживает динамические маршруты:

    /tests/:id

    /tests/:id/run

-> Router связывает authentication и страницы приложения в единый flow навигации.

### Architect + Design patterns

- Использована архитектура -> Feature-Sliced Design.

- Разделение ответственности -> pages/auth, отвечает за UI формы

- shared/api/supabase ->
выполняет запросы к Supabase

- entities/user -> хранит состояние пользователя

- app/router -> определяет доступ к страницам


### Technologies used

TypeScript, Supabase Auth, Feature-Sliced Design, Vite, CSS variables, SPA router, Netlify

### Что было сложным:

- понять структуру session Supabase
- сохранить username в metadata
- разделить UI слой и API слой
- реализовать восстановление сессии
- связать authentication с router
- реализовать redirect логику




# FEATURE 2:
## True - False widget
### Ссылки на PR
- Основной PR True - False widget: [PR #41](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/41)
- refactor localStorage PR: [PR #51](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/51)

Разработан интерактивный компонент для практики вопросов формата true/false.

Компонент:

- отображает вопросы формата true false
- управляет состоянием
- обрабатывает действия пользователя
- проверяет правильность ответа
- показывает explanation
- считает результат
- сохраняет прогресс пользователя
- передает данные в dashboard

### Цель фичи - создать переиспользуемый интерактивный компонент с понятной логикой состояния и разделением UI и бизнес-логики.

## Таблица баллов -> True - False widget

| Категория         | Описание                                             | Баллы |
|-------------------|------------------------------------------------------|------:|
| Complex Component | интерактивный widget с состоянием и результатом      | 25 |
| Rich UI Screen    | интеграция widget на отдельной странице practice     | 20 |

### **Итого: 45 баллов**

### Description of my work

Widget принимает:

- список вопросов
- userId
- callback onFinish

Каждый вопрос содержит:

- текст
- правильный ответ
- explanation

Создается состояние widget:

- currentIndex
- selectedAnswer
- score
- status

status управляет этапами работы widget:

- idle
- answered
- checked
- finished

Flow работы:

Пользователь выбирает ответ -> активируется кнопка Check
происходит проверка ответа
отображается explanation ->
пользователь переходит к следующему вопросу -> после последнего вопроса отображается итоговый результат.
-> После завершения widget вызывает callback onFinish.
-> Результат сохраняется в localStorage и используется dashboard для отображения прогресса пользователя.

### Architect + Design patterns

Widget реализован с разделением слоев:

- model -
содержит типы данных

- lib -
содержит бизнес логику

- ui -
создает DOM элементы

- pages -
интегрирует widget в приложение


### Technologies used

TypeScript, DOM API, Feature-Sliced Design, localStorage, Vitest, CSS animations

### Что было сложным: 

- спроектировать состояние widget
- разделить UI и бизнес логику
- реализовать flow вопросов
- связать widget с dashboard
- реализовать обновление DOM

## Дополнительно

### Ссылки на PR
- Основной PR - CI/CD GitHub Actions + Netlify deploy : [PR #16](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/16)
- PR - Netlify redirect config: [PR #42](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/42)

| Категория           | Описание                                                       | Баллы |
|---------------------|----------------------------------------------------------------|------:|
| Unit Tests (Basic)  | тесты validation, widget logic и localStorage                 | 5 |
| Advanced Animations | микро-анимация правильного ответа                             | 5 |
| Responsive          | адаптивная верстка login page и true-false widget             | 5 |
| Design Patterns     | state machine, callback pattern, public API, route guards     | 10 |
| Architect           | FSD структура, router-level orchestration, разделение слоев   | 10 |
| Auto-deploy         | настройка CI/CD и автоматического деплоя Netlify              | 5 |

**Итого: 40 баллов**



## TOTAL PERSONAL FEATURES SCORE

| Раздел | Баллы |
|--------|------:|
| Feature 1 - Authentication flow (Supabase) + Router | 45 |
| Feature 2 - True / False widget | 45 |
| Additional contributions (tests, animations, responsive, architecture, CI/CD) | 40 |

### **ИТОГО: 130 баллов**
