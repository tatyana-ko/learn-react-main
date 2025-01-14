import { useState } from "react";

interface TaskProps {
  removeTask: (id: string) => void;
  updateTask: Function;
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

export const TaskElement = (props: TaskProps) => {
  const { id, title, description, status, priority, removeTask, updateTask } =
    props;

  const [isEditing, setIsEditing] = useState(false);

  let taskContent;

  if (isEditing) {
    taskContent = (
      <>
       <label>
       Title:
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            updateTask({ ...props, title: e.target.value });
          }}
        />
        </label>

        <label>
        Description:
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => {
            updateTask({ ...props, description: e.target.value });
          }}
        />
        </label>

        <label>
          Priority:
          <select
            value={priority}
            onChange={(e) => {
              updateTask({ ...props, priority: e.target.value });
            }}
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </label>

        <label>
        Status:
          <select
            value={status}
            onChange={(e) => {
              updateTask({ ...props, status: e.target.value });
            }}
          >
            <option value="todo">todo</option>
            <option value="in-progress">in-progress</option>
            <option value="done">done</option>
          </select>
        </label>

        <button type="button" onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        <h2>Title: {title}</h2>
        <p>Description: {description}</p>     
        <p>Priority: {priority}</p>
        <p>Status: {status}</p>
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  };

  return (
    <li className="task-container">
      {taskContent}
      <button type="button" onClick={() => removeTask(id)}>
        Delete
      </button>
    </li>
  );
};
