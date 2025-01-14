import { useState } from "react";

interface ExerciseCounterProps {
  exerciseName: string;
}

export function ExerciseCounter({ exerciseName }: ExerciseCounterProps) {
  const [counter, setCounter] = useState(0);

  const handleIncrementClick = () => {
    setCounter((counter) => counter + 1);
  };

  const handleDecrementClick = () => {
    setCounter((counter) => counter - 1);
  };

  const handleReset = () => {
    setCounter(0);
  };
  
  return (
    <div className="exercise-counter">
      <h3>{exerciseName} : {counter}</h3>
      <button
        type="button"
        className="button"
        name="increment"
        onClick={handleIncrementClick}
      >
        + 1
      </button>
      <button
        type="button"
        className="button"
        name="decrement"
        onClick={handleDecrementClick}
        disabled={counter < 1}
      >
        - 1
      </button>
      <button 
        type="button" 
        className="button" 
        name="Reset" 
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}
