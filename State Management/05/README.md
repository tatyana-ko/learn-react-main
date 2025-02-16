# useReducer Implementation Task

## Бизнес-контекст
В сложных приложениях часто возникает необходимость управлять состоянием, которое имеет множество взаимосвязанных частей и сложную логику обновления. В этой задаче вам предстоит реализовать компонент управления задачами (Task Manager) с использованием useReducer для более эффективного управления состоянием.

## Задача
Создать компонент TaskManager, который позволяет управлять списком задач с различными статусами, приоритетами и фильтрами. Компонент должен использовать useReducer для управления состоянием вместо множества отдельных useState.

### Функциональные требования

1. Управление задачами:
   - Создание новой задачи (название, описание, приоритет)
   - Изменение статуса задачи (todo, in-progress, done)
   - Изменение приоритета (low, medium, high)
   - Удаление задачи
   - Редактирование задачи

2. Фильтрация и сортировка:
   - Фильтрация по статусу
   - Фильтрация по приоритету
   - Сортировка по дате создания
   - Сортировка по приоритету

3. Статистика:
   - Общее количество задач
   - Количество задач по статусам
   - Количество задач по приоритетам

### Технические требования

1. State Management:
   - Использование useReducer для управления состоянием
   - Типизированные actions
   - Чистые reducer функции
   - Оптимизация обновлений

2. TypeScript:
   - Строгая типизация state и actions
   - Дискриминированные объединения для actions
   - Типизация reducer функции

3. React:
   - Оптимизация рендеринга
   - Мемоизация колбэков
   - Разделение на подкомпоненты

4. Тестирование:
   - Тестирование reducer функции
   - Тестирование компонента
   - Тестирование взаимодействия пользователя

## Процесс проверки

### Автотесты (70%)
- [ ] Reducer функция корректно обрабатывает все actions
- [ ] Компонент правильно отображает начальное состояние
- [ ] Работает создание задачи
- [ ] Работает изменение статуса
- [ ] Работает изменение приоритета
- [ ] Работает удаление задачи
- [ ] Работает фильтрация
- [ ] Работает сортировка
- [ ] Статистика корректно обновляется

### Ручная проверка (30%)
- [ ] Понятный и удобный интерфейс
- [ ] Оптимальная структура state
- [ ] Качество TypeScript типов
- [ ] Производительность при большом количестве задач
- [ ] Чистота и организация кода

## Полезные материалы
- [useReducer Hook](https://react.dev/reference/react/useReducer)
- [TypeScript Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Testing Reducers](https://testing-library.com/docs/example-react-reducer/)
