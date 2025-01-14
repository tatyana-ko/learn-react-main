import { ChangeEvent } from "react";
import { changeParameters } from "../types/TaskManager";

interface SortProps {
  updateSort: (changeParameters: changeParameters) => void;
};

export const Sort = (props: SortProps) => {
  const { updateSort } = props;

  const options: changeParameters[] = [
    { name: "by date ascending", by: "createdAt", order: "asc" },
    { name: "by date descending", by: "createdAt", order: "desc" },
    { name: "by priority ascending", by: "priority", order: "asc" },
    { name: "by priority in descending order", by: "priority", order: "desc" },
  ];

  const change = (e: ChangeEvent<HTMLSelectElement>) => {
    const changeParameters = options[e.target.options.selectedIndex];
    
    updateSort(changeParameters);
  };

  return (
    <div className="sort-status">
      <p>Sort by : </p>
      <select onChange={(e) => change(e)}>
        {options.map((option, i) => (
          <option key={i} value={option.by}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
