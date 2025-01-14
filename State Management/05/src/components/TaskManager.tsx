import React, { useReducer, useState } from "react";
import { TaskManagerProps, Task, changeParameters, TaskPriority } from "../types/TaskManager";
import { taskReducer, initialState } from "../reducers/taskReducer";
import { TaskList } from "./TaskList";
import { Statistics } from "./Statistics";
import { Sort } from "./Sort";
import { FilterControls } from "./FilterControls";
import { TaskForm } from "./TaskForm";

// useMemmo и useCallback - не понимаю как применить
// addTask - передается часть Task (status, id, createdAt добавляется в reducer) - ошибка типа

export const TaskManager: React.FC<TaskManagerProps> = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = (newTask: { title: string, description: string, priority: TaskPriority }) => {
    dispatch({ type: "ADD_TASK", payload: newTask });
  };

  const removeTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: { id } });
  };

  const updateTask = (task: Task) => {
    dispatch({ type: "UPDATE_TASK", payload: task });
  };

  const updateFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "all") {
      dispatch({
        type: "SET_FILTER",
        payload: { type: "status", value: "" },
      });
    } else {
      dispatch({
        type: "SET_FILTER",
        payload: { type: "status", value: e.target.value },
      });
    }
  };

  const updateSort = (changeParameters: changeParameters) => {
    dispatch({
      type: "SET_SORT",
      payload: { by: changeParameters.by, order: changeParameters.order },
    });
  };

  const checkPriorityStats = (status: string) => {
    const result = state.tasks.filter((task) => task.priority === status);

    return result.length;
  };

  const checkStatusStats = (status: string) => {
    const result = state.tasks.filter((task) => task.status === status);

    return result.length;
  };

  let tasksForRender = state.tasks;
  if (state.filters.status) {
    tasksForRender = state.tasks.filter(
      (t) => t.status === state.filters.status
    );
  };

  const statsPriority = {
    low: 1,
    medium: 2,
    high: 3,
  };

  const sortedTasks = tasksForRender.sort((a, b) => {
    if (state.sort.by === "createdAt") {
      return state.sort.order === "asc"
        ? a.createdAt.getTime() - b.createdAt.getTime()
        : b.createdAt.getTime() - a.createdAt.getTime();
    } else if (state.sort.by === "priority") {
      return state.sort.order === "asc"
        ? statsPriority[a.priority] - statsPriority[b.priority]
        : statsPriority[b.priority] - statsPriority[a.priority];
    }
    return 0;
  });

  return (
    <>
      <header className="header">
        <button type="button" onClick={() => setModalOpen(true)}>
          Add task
        </button>
        <Sort updateSort={updateSort} />
        <FilterControls updateFilter={updateFilter} />
      </header>

      <TaskForm
        addTask={addTask}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />

      <main className="main">
        <h3>Tasks: </h3>
        <TaskList
          tasks={sortedTasks}
          removeTask={removeTask}
          updateTask={updateTask}
        />

        <Statistics
          checkPriorityStats={checkPriorityStats}
          checkStatusStats={checkStatusStats}
          stateLength={state.tasks.length}
        />
      </main>
    </>
  );
};
