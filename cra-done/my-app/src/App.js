import React, { useState, useRef, useEffect } from "react";

import TaskItem from "./TaskItem";
import NewTask from "./NewTask";

import styles from "./App.module.css";

let id = 0;

const App = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("my-app_tasks")) || {}
  );

  useEffect(() => {
    localStorage.setItem("my-app_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const ulRef = useRef(null);

  return (
    <div className={styles.container}>
      <h1>Task list</h1>
      <ul className={styles.list} ref={ulRef}>
        {Object.entries(tasks)
          .sort(([, a], [, b]) => a.created - b.created)
          .map(([id, task]) => (
            <li key={id} data-id={id}>
              <TaskItem
                item={task}
                deleteTask={() => {
                  const animation = ulRef.current
                    .querySelector(`[data-id="${id}"]`)
                    .animate(
                      [
                        {
                          opacity: 1,
                          transform: "translateX(0) translateY(0) rotateZ(0)"
                        },
                        {
                          opacity: 0.5,
                          transform: `translateX(100vw) translateY(10px) rotateZ(${90 *
                            Math.random()}deg)`
                        }
                      ],
                      {
                        duration: 250,
                        easing: "ease-in"
                      }
                    );
                  animation.onfinish = () => {
                    const { [id]: _taskToDelete, ...restOfTasks } = tasks;
                    setTasks(restOfTasks);
                  };
                }}
                toggleDone={() => {
                  const { [id]: taskToUpdate, ...restOfTasks } = tasks;
                  setTasks({
                    [id]: { ...taskToUpdate, done: !taskToUpdate.done },
                    ...restOfTasks
                  });
                }}
              />
            </li>
          ))}
      </ul>
      <NewTask addTask={task => setTasks({ ...tasks, [++id]: task })} />
    </div>
  );
};

export default App;
