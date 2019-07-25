import React, { useState } from "react";

import styles from "./NewTask.module.css";

const NewTask = ({ addTask }) => {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        addTask({ content: value, done: false, created: Date.now() });
        setValue("");
      }}
    >
      <input
        className={styles.input}
        type="text"
        value={value}
        placeholder="Enter your new task here"
        onChange={event => setValue(event.target.value)}
      />
    </form>
  );
};

export default NewTask;
