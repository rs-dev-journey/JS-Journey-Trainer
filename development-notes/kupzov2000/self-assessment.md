# Self-Assessment: Evgeny Kuptsov

**GitHub:** [kupzov2000](https://github.com/kupzov2000)  
**Pull Request:** [PR #56](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/56)  
**Total self score:** 145

## 📋 Personal Features Table

| **Category**     | **Feature**                               | **Description**                                                                                                                                                                                         | **PR Link**                                                            | **Score** |
| ---------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------- |
| My Components    | Complex Component: Test Run Page          | Implemented the `run-test` flow as a complex interactive component. Includes the test-taking engine, progress through questions, result UI after completion, and the ability to view incorrect answers. | [PR #26](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/26) | +25       |
|                  | Rich UI Screen: Tests List                | Implemented the `Tests List` screen with test cards and information about the user's latest test attempts and progress.                                                                                 | [PR #26](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/26) | +20       |
|                  | Rich UI Screen: Test Overview             | Implemented the `Test Overview` screen with attempts history, ability to start the test, and show answers functionality.                                                                                | [PR #26](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/26) | +20       |
| Backend & Data   | BaaS CRUD                                 | Implemented read and write operations in Supabase for `user_test_attempts`, `user_test_progress`, and `user_test_incorrect_answers`.                                                                    | [PR #46](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/46) | +15       |
| UI & Interaction | Theme Switcher                            | Integrated support for Dark and Light themes in personal screens.                                                                                                                                       | [PR #26](https://github.com/rs-dev-journey/JS-Journey-Trainer/pull/26) | +10       |
|                  | Advanced Animations                       | Implemented micro-interactions in personal screens such as animated progress updates, state transitions for interactive elements, and visual feedback for user actions.                                 |                                                                        | +10       |
|                  | Accessibility (a11y)                      | Improved accessibility with ARIA attributes, keyboard navigation support, and accessibility-focused UI decisions.                                                                                       |                                                                        | +10       |
|                  | Responsive Design                         | Adapted personal screens for mobile devices, including support for layouts starting from 320px width.                                                                                                   |                                                                        | +5        |
| Architecture     | Design Patterns: Facade, Adapter, Factory | Applied design patterns in personal features to structure screen orchestration, UI mapping, and component creation in a clear and maintainable way.                                                     |                                                                        | +10       |
|                  | State Manager                             | Custom state. Centralized state, actions, and selectors for managing the test passing flow separately from UI components.                                                                               |                                                                        | +10       |
|                  | API Layer                                 | Isolated Supabase interaction inside `entities/*/api`, keeping UI components independent from direct database access.                                                                                   |                                                                        | +10       |
| **TOTAL**        |                                           |                                                                                                                                                                                                         |                                                                        | **145**   |

## 🛠 Work Description

В этом проекте я развивал навыки **frontend-разработки на Vanilla JavaScript / TypeScript**, работая над архитектурой приложения, пользовательскими сценариями и сложным UI-модулем для прохождения тестов. Основной фокус был направлен на построение понятной структуры проекта на базе **FSD (Feature-Sliced Design)**, реализацию полноценного flow тестирования пользователя и разделение UI, бизнес-логики и слоя данных.

### Ключевые этапы разработки:

**Февраль 2026 — Старт проекта и инфраструктура:**

- Участвовал в запуске проекта: создал GitHub organization, Kanban board, репозиторий и настраивал базовые project configs
- Настроил инструменты разработки: **Vite, ESLint, Prettier, TypeScript, Vitest**
- На раннем этапе выбрал и адаптировал **FSD-like подход** для архитектуры проекта

**Февраль 2026 — Архитектура и командные правила:**

- Начал и затем завершил разработку **свода правил по архитектуре проекта** на основе FSD
- Пытался синхронизировать команду по архитектурным принципам и объяснял, как раскладывать код по слоям
- В процессе глубже разобрался в том, как разделять ответственность между **UI, бизнес-логикой и API**

**Март 2026 — Проектирование тестовой системы и экран Tests List:**

- Продумал UI для модуля **JS Tests / Quiz**
- Спроектировал **бизнес-сущности** для тестов и пользовательского прогресса
- Почти полностью реализовал страницу **Tests List** с карточками тестов
- Использовал **mock data** как временную замену backend, пока серверная часть ещё отсутствовала

**Март 2026 — Test Overview и Test Run flow:**

- Реализовал страницу **Test Overview** с отображением прошлых попыток прохождения теста
- Добавил действия **Start Test** и **Show Answers** для работы со сценарием тестирования
- Реализовал страницу **Test Run** с последовательным прохождением вопросов по одному
- Добавил сохранение ответа пользователя и динамическое переключение интерфейса на следующий вопрос
- Реализовал **progress UI**: текущий вопрос и progress bar

**Март 2026 — Результаты теста и завершение пользовательского сценария:**

- Реализовал **UI результата прохождения теста**
- Спроектировал сущности для **сохранения результатов теста**
- Добавил сохранение результатов прохождения в mock-данные
- Реализовал UI для просмотра **ошибок последней попытки** с вопросами, выбранными и корректными ответами
- Связал между собой страницы **Tests List → Test Overview → Test Run → Result**, собрав цельный пользовательский flow

**Март 2026 — Доработка UI и интеграция частей приложения:**

- Реализовал **CSS-стили для страницы Test Run**
- Добавил **светлую и тёмную темы** для страниц Tests List, Test Overview и Test Run
- Довёл свою часть приложения до финального вида, связав все ключевые экраны и действия пользователя

### Архитектурные решения:

- Использовал **FSD (Feature-Sliced Design)** как основу структуры проекта, чтобы разделять ответственность между слоями и уменьшать хаос в кодовой базе
- Вынес бизнес-логику прохождения теста в отдельную feature `run-test`, чтобы не смешивать её с UI
- Реализовал простой **custom state manager** для test flow: store + selectors для управления состоянием прохождения теста без тяжёлых библиотек вроде Redux
- Использовал **Facade pattern** в orchestration-функциях вроде `loadTestsList` и `initTestRun`, чтобы скрыть загрузку, агрегацию и подготовку данных от верхнего слоя
- Использовал **Adapter pattern** для преобразования `Domain Model → ViewModel`, чтобы UI не зависел от сырых структур данных и backend-формата
- Разделил API по сущностям, например `entities/test/api`, `entities/user-test-progress/api`, `entities/attempt/api`, чтобы сохранить ясные границы ответственности

### Контроль качества:

- Делал **code review** для других участников команды, комментировал архитектуру, читаемость, декомпозицию функций и типобезопасность
- Во время разработки уделял внимание тому, чтобы код был лучше разделён на логические части: UI, бизнес-логику и работу с данными

### Процесс разработки:

- Систематически вёл **development notes**, фиксируя прогресс, сложности и планы по задачам
- Участвовал в командной синхронизации по архитектуре
- По ходу проекта не только писал функциональность, но и постепенно учился мыслить как разработчик системно: через архитектуру, сценарии взаимодействия, модели данных и границы между слоями

### Что я вынес из проекта:

- На практике разобрался, что архитектура это не набор красивых слов, а постоянный процесс принятия решений и компромиссов
- Научился лучше разделять **UI, domain logic и data layer**
- Получил опыт проектирования сложного пользовательского сценария от списка сущностей до финального интерфейса и связанного flow между страницами
- Осознал, насколько важны адаптеры, view model, orchestration-функции и продуманная структура проекта, особенно когда приложение начинает расти

## Feature Components

### 1. Test Overview

**Описание:**  
Реализована страница **Test Overview**, которая служит промежуточным экраном между списком тестов и прохождением конкретного теста. На этой странице пользователь может увидеть основную информацию о тесте, историю своих предыдущих попыток и перейти либо к повторному прохождению теста, либо к просмотру ошибок последней попытки.

**Компоненты:**

- **TestOverviewPage** — страница обзора теста
- **AttemptsTable / AttemptsSection** — блок с отображением предыдущих попыток пользователя
- **Start Test button** — переход к прохождению теста
- **Show Answers button** — переход к просмотру ошибок последней попытки
- **Back to Tests button** — возврат к общему списку тестов

**Функциональность:**

- Отображение информации о выбранном тесте
- Показ истории попыток пользователя: дата, длительность, результат, статус
- Переход к прохождению теста по нажатию **Start Test**
- Переход к просмотру ошибок последней попытки по нажатию **Show Answers**
- Обработка состояния загрузки при получении данных
- Обработка сценариев, когда попыток ещё нет или данные отсутствуют
- Навигация обратно к списку тестов

**Архитектурные решения:**

- **Facade-like orchestration** — отдельная функция загрузки страницы (loadTestOverview) скрывает детали получения теста, прогресса и попыток
- **Декомпозиция UI** — таблица попыток и управляющие элементы вынесены в отдельные части
- **FSD подход** — страница, сущности, feature-логика и shared-утилиты разделены по слоям

---

### 2. Test Run Page

**Описание:**  
Реализована страница **Test Run**, которая отвечает за полный сценарий прохождения теста: показ вопросов по одному, сохранение ответов пользователя, отображение прогресса, вычисление результата и показ экрана завершения. Это один из самых сложных модулей проекта, потому что он сочетает UI, состояние, бизнес-логику и переходы между несколькими внутренними состояниями.

**Компоненты:**

- **TestRunPage** — корневая страница прохождения теста
- **QuestionSection** — блок с текущим вопросом и вариантами ответов
- **ProgressHeader / ProgressBar** — отображение текущего номера вопроса и прогресса
- **Submit / Next button** — подтверждение ответа и переход дальше
- **ResultSection** — экран результата после завершения теста
- **IncorrectAnswersSection** — экран просмотра ошибок последней попытки

**Функциональность:**

- Пошаговое прохождение теста: один вопрос за раз
- Сохранение выбранного ответа пользователя
- Переход между вопросами
- Отображение текущего прогресса прохождения
- Вычисление результата после завершения теста
- Показ итоговой статистики: количество правильных ответов, процент, длительность
- Возможность просмотра ошибок после завершения теста
- Возможность повторного прохождения теста
- Сохранение результата прохождения
- Обработка состояний загрузки и ошибок

**Архитектурные решения:**

- **Custom state manager** — для сценария прохождения теста реализовано отдельное состояние с `store`, `actions` и `selectors`
- **Изоляция бизнес-логики от UI** — логика прохождения, расчёта результата и переключения состояний вынесена из DOM-слоя
- **Selectors** — вычисляемые данные (текущий вопрос, номер вопроса, прогресс, завершённость) получаются через отдельный слой
- **Facade-like init function** — инициализация страницы скрывает загрузку теста и подготовку состояния
- **Adapter pattern** — результат теста преобразуется в UI-friendly формат для итогового экрана
- **FSD подход** — state management, UI и data access разделены по разным слоям
- **Чёткое разделение сценариев** — прохождение теста, экран результата и просмотр ошибок организованы как связанные, но изолированные состояния интерфейса
