import { TaskElement } from "./TaskElement";
import { Task } from "../types/TaskManager";

interface TaskListProps {
  tasks: Task[];
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;
}

export const TaskList = (props: TaskListProps) => {
  const {tasks, removeTask, updateTask} = props;

  return <ul className="task-list">
    {tasks?.map((t: Task) => <TaskElement key={t.id} removeTask={removeTask} updateTask={updateTask} {...t}/>)}
  </ul>
};