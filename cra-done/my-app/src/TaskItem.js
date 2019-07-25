import React, { useRef, useLayoutEffect } from "react";
import { format } from "timeago.js";

import styles from "./TaskItem.module.css";

const TaskItem = ({
  item: { content, done, created },
  deleteTask,
  toggleDone
}) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    ref.current.animate(
      { opacity: [0, 1] },
      { duration: 250, easing: "ease-out" }
    );
  }, []);

  return (
    <div className={styles.task + " " + (done ? styles.done : "")} ref={ref}>
      <span className={styles.content}>{content}</span>
      <button onClick={deleteTask}>Delete</button>
      <label className={styles.state}>
        <span>Done: </span>
        <input type="checkbox" checked={done} onChange={toggleDone} />
      </label>
      <span>{format(new Date(created))}</span>
    </div>
  );
};

export default TaskItem;
