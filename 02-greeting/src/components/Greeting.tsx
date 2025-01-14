import { useState } from "react";

export function Greeting() {
  const [name, setName] = useState("");

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value.trim());
  };

  return (
    <div className="greeting-form">
      <input
        type="text"
        className="greeting-input"
        placeholder="Введите ваше имя"
        onChange={handleNameChange}
      />
      <p className="greeting-message">
        {name ? `привет, ${name}` : "привет, гость!"}
      </p>
    </div>
  );
}

export default Greeting;
