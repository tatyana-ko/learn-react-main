import React, { useState } from 'react';

export function Counter() {
  const [counter, setCounter] = useState(0);

  const handleIncrementClick = () => {
    setCounter((counter) => counter + 1);
  };

  return (
    <div>
      <p>Значение: {counter}</p>
      <button type='button' onClick={handleIncrementClick}>+1</button>
    </div>
  );
}

export default Counter;
