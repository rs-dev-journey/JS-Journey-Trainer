### Дата: 2026-03-25 (RU)
### Что было сделано:

Вчера мы с командой решили смержить некоторые куски кода. Также нам надо было слить всё в рабочий проект, чтобы записать видео, как работают 404, loading и error API. Лера написала код для loading и 404, в моём проекте уже была обработка ошибок, осталось только, чтобы это всё отработало хотя бы локально.

Это был error day. Что пошло не так?

Моя коллега Лера большая молодец. Она написала код для 404 в виде небольшой интерактивной игры, написала loader и добавила изменения по работе Husky. Замержила это всё в ветку development. Я, соответственно, сделала git pull, смержила изменения из development в свою ветку login.

Проблемы возникли ещё на этапе установки зависимостей Husky. Что-то было связано с Supabase. Закинула запрос в GPT, сперва он мне сообщил, что мой пакет слишком расширенный, и как вариант можно установить только Supabase Auth. Я в итоге начала переустанавливать пакеты, что заняло немало времени.

Потом я подумала: зачем, может, можно оставить расширенный пакет, он же всё-таки всё содержит, а вдруг потом у кого-то из ребят будет желание работать с БД. В итоге переформулировала запрос, и он мне выдал иное решение, которое мне больше понравилось: вернуть общий пакет + phoenix, и ещё в tsconfig добавить конфигурацию.

В итоге сборка прошла, всё отлично заработало, Husky отображает как надо, проверку делает по этапам перед push после коммита.

Дальше я начала работать с loading. У меня он не запускался, обращалась к GPT, он мне выдавал пару ответов, я тестила, но всё равно рендеринг не срабатывал.

В итоге только после того, как я добавила setTimeout, этот прекраснейший верблюд отобразился при клике на кнопку Submit, для этого мне понадобился Promise.

Также пока ещё остаётся проблема с работой деплоя на Netlify: почему-то не собирает зависимости и пока что не отображает ничего. Локально сборка без проблем.

Вчера у меня была проблема с тем, что я забываю свой код. Ну то есть, я же его писала, и почему не могла в каком-то месте сама вспомнить свои логические цепочки — не знаю, может, надо память проверить))

В итоге разобралась, смогла найти решение, куда лучше “прилипнуть” loading, очень рада была увидеть рабочую версию.

В итоге потом смержила в проект 404-страницу, подправила пару моментов, пару импортов, и всё заработало. Мы с Лерой в 12 ночи загрузили всё на ветку, и видео, и ссылку.

Какие темы я узнала чуть лучше: пакеты Supabase, как работает loading и в какие места можно его добавлять, как работает Husky и как его устанавливать, как работать с разными ветками, мержить, потом опять пушить, и всё это совместно с ребятами.

### Планы (что дальше?)

Дальше по планам я хочу сегодня начать прописывать логику виджета true/false.

Вероятнее всего, я не успею сделать её полностью, но хотя бы скелет напишу, постараюсь привести в более-менее презентабельный вид.
Также надо разобраться с Netlify и добавить в код использование username.

### Мысли

Считаю, что в данной финальной такске познаю много полезной информации. Понимаю что я самая слабая в команде, очень много пробелов в знаниях. Поняла, что теорию вроде хорошо понимаю, но практики очень мало, надо больше кода писать, и, может, когда-нибудь дотянусь хоть до среднего уровня.

### Date: 2026-03-25 (EN)
### What was done:

Yesterday, my team and I decided to merge some parts of the code. We also needed to combine everything into a working project so that we could record a video showing how the 404 page, loading state, and API error handling work. Lera wrote the code for the loading state and the 404 page, and my project already had error handling, so the main task was to make all of it work together at least locally.

It was an error day. What went wrong?

My colleague Lera did a great job. She wrote the code for the 404 page as a small interactive game, created a loader, and added changes related to Husky. Then she merged all of that into the development branch. I then did a git pull and merged the changes from development into my login branch.

The problems started at the stage of installing Husky dependencies. There was something related to Supabase. I asked GPT about it, and at first it told me that my package was too broad and that one possible option was to install only Supabase Auth. In the end, I started reinstalling packages, which took quite a lot of time.

Then I thought: why do that, maybe it makes more sense to keep the extended package, since it still contains everything, and maybe later someone from the team will want to work with the database. In the end, I rephrased my question, and it gave me another solution that I liked more: restore the full package + phoenix, and also add configuration to tsconfig.

As a result, the build succeeded, everything worked well, Husky was displayed as expected, and it now runs checks step by step before push after commit.

After that, I started working on the loading state. It was not running for me. I asked GPT again, got a couple of answers, tested them, but the rendering still did not work.

In the end, only after I added setTimeout did this wonderful camel appear when clicking the Submit button, and for that I needed a Promise.

There is also still a problem with deployment on Netlify: for some reason it does not install the dependencies and still shows nothing. Locally, the build works without problems.

Yesterday I also had an issue with forgetting my own code. I mean, I wrote it myself, and still at some point I could not remember my own logic chains. I do not know why — maybe I should check my memory))

In the end, I figured it out, managed to find a better place to attach the loading state, and I was very happy to see the working version.

After that, I merged the 404 page into the project, fixed a couple of things and a couple of imports, and everything worked. Lera and I uploaded everything to the branch at midnight, along with the video and the link.

The topics I understood a bit better were: Supabase packages, how loading works and where it can be added, how Husky works and how to install it, how to work with different branches, merge them, then push again, and how to do all of this together with teammates.

### Plans (what’s next?)

According to my plans, today I want to start writing the logic for the true/false widget.

Most likely, I will not have time to finish it completely, but I at least want to write the basic skeleton and try to make it look more or less presentable.
I also need to разобраться with Netlify and add username usage into the code.

### Thoughts

I think that in this final task I am learning a lot of useful things. I understand that I am the weakest member of the team and that I still have many gaps in my knowledge. I realized that I understand the theory quite well, but I have very little practice. I need to write more code, and maybe one day I will reach at least an intermediate level.