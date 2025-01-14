import { v4 as uuidv4 } from "uuid";
import { TaskState, TaskAction, Task } from "../types/TaskManager";

export const initialState: TaskState = {
  tasks: [],
  filters: {},
  sort: {
    by: "createdAt",
    order: "desc",
  },
};

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK":
      const newTask: Task = {
        ...action.payload,
        status: "todo",
        id: uuidv4(),
        createdAt: new Date(),
      };
      return {
        ...state,
        tasks: [newTask, ...state.tasks],
      };

    case "UPDATE_TASK":
      const updatedTask = state.tasks.map((t) => {
        if (t.id === action.payload.id) {
          return { ...t, ...action.payload };
        } else {
          return t;
        }
      });

      return {
        ...state,
        tasks: updatedTask,
      };

    case "DELETE_TASK":
      const filteredTasks = state.tasks.filter(
        (t) => t.id !== action.payload.id
      );
      return { ...state, tasks: filteredTasks };

    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.type]: action.payload.value,
        },
      };

    case "SET_SORT":
      return {
        ...state,
        sort: { by: action.payload.by, order: action.payload.order },
      };

    default:
      return state;
  }
}
