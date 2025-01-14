import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TaskPriority } from "../types/TaskManager";

interface Task {
  title: string,
  description: string,
  priority: TaskPriority,
};

interface TaskFormProps {
  addTask: (task: Task) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

export const TaskForm = (props: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("low");

  const handleAddTask = () => {
    if (!title) {
      return;
    }

    props.addTask({
      title,
      description,
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority("low");
    props.setModalOpen(false);
  };

  return (
    <>
      {props.modalOpen && (
        <dialog className="dialog" open={props.modalOpen}>
          <IoMdClose
            className="closeButton"
            onClick={() => props.setModalOpen(false)}
          />
          <form className="form">
            <h2>Add new task:</h2>
            <label>
              {" "}
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label>
              {" "}
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <label>
              Priority:
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </label>

            <button type="button" onClick={handleAddTask}>
              Add Task
            </button>
          </form>
        </dialog>
      )}
    </>
  );
};
