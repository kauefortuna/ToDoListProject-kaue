import styled from "styled-components";
import React, { useState } from "react";
import SubTaskSimple from "./SubTaskSimple.jsx";
import { useEffect } from "react";

const MainTask = ({ ...props }) => {
  function handleInputChange(event) {
    setnewSsubtask(event.target.value);
  }

  let subtasks = props.task.subtasks || [];

  const [newsubtask, setnewSsubtask] = useState("");

  function addSubTask() {
    if (newsubtask.trim() !== "") {
      const updated = [...subtasks, newsubtask];
      props.updateSubtasks(updated);
      setnewSsubtask("");
    }
  }

  function deleteAllSubTasks() {
    subtasks = [];
  }

  function deleteSubTask(index) {
    const newSubTasks = subtasks.filter((_, i) => i != index);
    props.updateSubtasks(newSubTasks);
  }

  return (
    <StyledWrapper>
      <div className="card">
        <div className="chat-header">
          <table>
            <tr>
              <th>{props.task.title}</th>
              <td style={{ width: "75px" }}></td>
              <td>
                <td
                  style={{ cursor: "pointer" }}
                  className="DoneButton"
                  onClick={() => {
                    deleteAllSubTasks();
                    props.onDelete();
                  }}
                >
                  Done
                </td>
              </td>
              <td>
                <div
                  style={{ cursor: "pointer" }}
                  className="line one"
                  onClick={() => props.onReallyDelete()}
                />
                <div
                  style={{ cursor: "pointer" }}
                  className="line two"
                  onClick={() => props.onReallyDelete()}
                />
              </td>
            </tr>
          </table>
        </div>
        <div className="chat-window">
          <ul className="message-list">
            {subtasks.map((subtask, index) => (
              <li className="listItem" key={index}>
                <SubTaskSimple
                  task={subtask}
                  key={subtask}
                  onDelete={() => deleteSubTask(index)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-input">
          <input
            placeholder="Create SubTask."
            className="send-input"
            type="text"
            value={newsubtask}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") addSubTask();
            }}
          />
          <button className="send-button" onClick={addSubTask}>
            Add
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  th {
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 130px;
  }
  td {
    text-align: center;
    width: 15%;
    vertical-align: middle;
    padding-right: 5px;
    padding-left: 5px;
  }

  .listItem {
    padding-left: 2px;
    text-align: left;
    width: 100%;
    overflow-wrap: break-word;
    white-space: normal;
    margin-bottom: 10px;
    word-break: break-word;
  }
  .card {
    opacity: 0.85;
    width: 260px;
    background-color: #ef483f;
    border: 1px solid #ef483f;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }

  .chat-header {
    background-color: #f98f53;
    color: #fff;
    padding: 10px;
    font-size: 18px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .message-list {
    list-style: none;
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  .chat-input {
    background-color: #f98f53;
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #ef483f;
  }

  .message-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 5px;
    font-size: 14px;
  }

  .send-button {
    border: none;
    border-radius: 7px;
    outline: none;
    background-color: #24416d;
    color: #fff;
    font-size: 14px;
    padding: 5px 10px;
    cursor: pointer;
  }

  .send-button:hover {
    background-color: rgba(199, 63, 63, 1);
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }

  /*Comment for divider */

  .DoneButton {
    color: white;
    margin-left: -90px;
    margin-top: 3px;
    border-radius: 12px;
    background-color: #24416d;
    border-radius: 7px;
    height: 30px;
    width: 55px;
  }

  .DoneButton:hover {
    background-color: rgba(199, 63, 63, 1);
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }

  .container {
    opacity: 0.85;
    box-shadow: 3px 3px 7px #ef483f;
    width: 300px;
    height: 320px;
    background-color: rgb(249 143 83);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }

  .line {
    position: absolute;
    width: 20px;
    height: 3px;
    background-color: #ffffffff;
    border-radius: 30px;
  }

  .line.one {
    transform: rotate(45deg);
  }

  .line.two {
    transform: rotate(135deg);
  }

  .send-input {
    outline: none;
    display: flex;
    border: none;
    background: none;
    height: 40px;
    width: 230px;
    border-radius: 7px;
    background: none;
    color: white;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 5px;
  }

  .send-input::placeholder {
    color: #ffffffff;
  }
`;

export default MainTask;
