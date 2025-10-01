import React, { useState } from "react";
import { use } from "react";
import MainTask from "./MainTask.jsx";
import MainTaskRecover from "./MainTaskRecover.jsx";
import SubTaSubTaskSimplesk from "./SubTaskSimple.jsx";

function CompletedWrapper({ ...props }) {
  function deleteTask(index) {
    const newTasks = props.completedTasks.filter((_, i) => i != index);
    props.setCompletedTasks(newTasks);
  }

  function reallyDeleteTask(index) {
    const newTasks = props.completedTasks.filter((_, i) => i != index);
    props.setCompletedTasks(newTasks);
  }

  function recoverTask(index) {
    const recoveredTask = props.completedTasks[index];

    // Get existing tasks from localStorage
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Add the recovered task
    const updatedTasks = [...existingTasks, recoveredTask];

    // Save back to localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    reallyDeleteTask(index);
    window.location.reload();
  }

  return (
    <>
      <div style={props.style}>
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
            Completed Tasks
          </h1>
        </div>
        <div className="divList">
          {props.completedTasks.map((task, index) => (
            <div className="listItem" key={index}>
              <MainTaskRecover
                task={task}
                onReallyDelete={() => reallyDeleteTask(index)}
                onDelete={() => recoverTask(index)}
                updateSubtasks={(newSubtasks) => {
                  const updatedTasks = [...props.completedTasks];
                  updatedTasks[index].subtasks = newSubtasks;
                  props.setCompletedTasks(updatedTasks);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CompletedWrapper;
