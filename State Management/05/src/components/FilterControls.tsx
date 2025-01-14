import { ChangeEvent } from "react";

interface FilterControlsProps {
  updateFilter: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const FilterControls = (props: FilterControlsProps) => {
  const { updateFilter } = props;
  const options = ["all", "todo", "in-progress", "done"];

  return (
    <div className="sort-status">
      <p>Sort by status: </p>
      <select onChange={(e) => updateFilter(e)}>
        {options.map((option, i) => (
          <option key={i}>{option}</option>
        ))}
      </select>
    </div>
  );
};
