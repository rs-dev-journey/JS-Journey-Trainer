### Дата: 2026-03-30 (RU)

### Что было сделано:
Коротко:
- Создана структура виджета true-false в папке widgets.
- Добавлены TypeScript-типы для вопроса, состояния виджета и результата ответа.
- Подготовлены mock-данные для вопросов True/False.
- Реализована отдельная helper-функция для проверки ответа.
- Собрана функция renderTrueFalseWidget с кнопками, локальным состоянием, выводом результата и explanation.

### Проблемы и как решила:

1) Путала типы и реальные значения в коде — разделила type-описания и runtime state.
2) Функция получалась слишком длинной по правилам линтера — вынесла часть логики в helper-функции.
3) В callback передавалось поле, которого не было в типе результата — привела объект результата к TrueFalseResult.
4) Повторялся код создания кнопок и текстовых блоков — вынесла его в локальные helper-функции createButton и createTextBlock.

Начала с того, что закинула в AI запрос на архитектуру создания true-false widget. Информации он выдал много, взяла только скелет и то, как лучше разбить по папкам. Сперва думала, что основную папку надо закинуть в /feature, спросила у коллег, они свои виджеты делали в папке /widgets. Позже уточнила у AI, в чем различие по FSD, и в итоге поняла, что /feature — это про пользовательский сценарий (use case), а /widgets — это уже крупный UI-блок, который этот сценарий использует.
Далее я уточнила, с чего обычно начинают разработку опытные разработчики. Итог: не с рендеринга UI, а с описания границ ответственности, потом уже код, чтобы можно было передать для использования следующего блока.

Первое, с чего я начала, — это создание типов -> types.ts.
Далее прочитала, как лучше создать моковые данные для виджета: через supabase, json или через mock.ts. Последний вариант в моем случае самый удобный, так как знаний еще маловато, и надо быстрее закончить фичу, поэтому выбираю создание через обычный файл ts.
Дальше мне необходимо было создать маленькую функцию (check-answer.ts), которая принимает правильный ответ, принимает ответ пользователя и возвращает true, если ответ верный, и false, если неверный.
Следующим шагом надо было создать файл (render-true-false-widget.ts), в котором создается DOM для одного вопроса: текст утверждения, 2 кнопки TRUE/FALSE, и третья кнопка CHECK, финальный результат и текст-объяснение.

### Планы (что дальше?)

Дальше надо сделать index.ts, чтобы всем было удобно импортировать, отрисовать UI, протестить.

### Мысли

Не сдаваться!


### Date: 2026-03-30 (EN)

### What was done:
In short:
- Created the structure of the true-false widget in the widgets folder.
- Added TypeScript types for the question, widget state, and answer result.
- Prepared mock data for True/False questions.
- Implemented a separate helper function for checking the answer.
- Built the renderTrueFalseWidget function with buttons, local state, result output, and explanation.

### Problems and how I solved them:

1) I was confusing types and real values in the code, so I separated type descriptions and runtime state.
2) The function was getting too long according to the linter rules, so I moved part of the logic into helper functions.
3) A field that was not included in the result type was being passed to the callback, so I adjusted the result object to match TrueFalseResult.
4) The code for creating buttons and text blocks was repeated, so I moved it into local helper functions createButton and createTextBlock.

I started by sending a request to AI for the architecture of creating a true-false widget. It gave me a lot of information, and I only took the basic skeleton and the suggestion on how to organize the folders. At first, I thought the main folder should be placed in /feature. I asked my teammates, and they had created their widgets in the /widgets folder. Later, I asked AI what the difference was according to FSD, and in the end I understood that /feature is about a user scenario (use case), while /widgets is already a large UI block that uses this scenario.
Then I clarified where experienced developers usually start development. The conclusion was: not from rendering the UI, but from defining the responsibility boundaries first, and only then writing the code so it could be passed on for use by the next block.

The first thing I started with was creating the types -> types.ts.
Then I read about the best way to create mock data for the widget: through supabase, json, or mock.ts. The last option was the most convenient in my case, because I still do not have enough knowledge yet, and I need to finish the feature faster, so I chose to create it through a regular ts file.
Next, I needed to create a small function (check-answer.ts) that takes the correct answer, takes the user's answer, and returns true if the answer is correct and false if it is incorrect.
The next step was to create the file (render-true-false-widget.ts), where the DOM for one question is created: the statement text, 2 TRUE/FALSE buttons, and a third CHECK button, the final result, and the explanation text.

### Plans (what is next?)

Next, I need to create index.ts so that it is convenient for everyone to import, render the UI, and test it.

### Thoughts

Do not give up!