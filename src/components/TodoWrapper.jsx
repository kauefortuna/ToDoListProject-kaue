import React, { useState } from "react";
import { use } from "react";
import MainTask from "./MainTask.jsx";
import SubTaSubTaskSimplesk from "./SubTaskSimple.jsx";
import { useEffect } from "react";

function TodoList({ ...props }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      const newTaskObject = {
        title: newTask,
        subtasks: [],
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const newTasks = tasks.filter((_, i) => i != index);
    props.setCompletedTasks([...props.completedTasks, tasks[index]]);
    setTasks(newTasks);
  }

  function reallyDeleteTask(index) {
    const newTasks = tasks.filter((_, i) => i != index);
    setTasks(newTasks);
  }

  function deleteAllTasks() {
    setTasks([]);
  }

  return (
    <>
      <div style={props.style} className="Wrapper">
        <div className="to-do-list">
          <div
            style={{
              opacity: "0.9",
              backgroundColor: "#ef483f",
              borderRadius: "16px",
              width: "fit-content",
              marginLeft: "auto",
              marginRight: "auto",
              padding: "8px 12px 0.1px 12px",
            }}
          >
            <h1 className="fancy-title" style={{ backgroundColor: "white" }}>
              To-Do-List
            </h1>
          </div>

          <div>
            <input
              className="input"
              type="text"
              placeholder="Enter a task..."
              value={newTask}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask();
              }}
            />

            <button className="cssbuttons-io-button" onClick={addTask}>
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>Add</span>
            </button>

            <button className="cssbuttons-io-button2" onClick={deleteAllTasks}>
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>Delete All</span>
            </button>
          </div>

          <div className="divList">
            {tasks.map((task, index) => (
              <div className="listItem" key={index}>
                <MainTask
                  task={task}
                  onReallyDelete={() => reallyDeleteTask(index)}
                  onDelete={() => deleteTask(index)}
                  updateSubtasks={(newSubtasks) => {
                    const updatedTasks = [...tasks];
                    updatedTasks[index].subtasks = newSubtasks;
                    setTasks(updatedTasks);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
