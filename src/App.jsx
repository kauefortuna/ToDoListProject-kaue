import TodoList from "./components/TodoWrapper.jsx";
import CompletedWrapper from "./components/CompletedWrapper.jsx";
import ButtonComplete from "./components/ButtonComplete.jsx";
import React, { useState } from "react";
import { useEffect } from "react";

const hour = new Date().getHours();

if (hour >= 6 && hour < 18) {
  document.body.style.backgroundImage =
    'url("https://a-static.besthdwallpaper.com/balcony-lofi-wallpaper-1920x1200-106546_6.jpg")';
  document.body.style.backgroundSize = "cover";
} else {
  document.body.style.backgroundImage =
    'url("https://framerusercontent.com/images/kGNP61CpFzitMEIVe88KZdgRPF8.jpg")';
  document.body.style.backgroundSize = "cover";
}

function App() {
  const [Selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("Selected");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("Selected", JSON.stringify(Selected));
  }, [Selected]);

  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem("completedTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  return (
    <>
      <div>
        <button
          onClick={() => {
            setSelected(true);
          }}
          style={{
            display: Selected ? "none" : "block",
            borderRadius: "16px",
            background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
            color: "#fff",
            padding: "12px 24px",
            border: "none",
            margin: "16px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            cursor: "pointer",
          }}
        >
          Check Completed Tasks
        </button>
        <TodoList
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
          style={{ display: Selected ? "none" : "block" }}
        />

        <button
          onClick={() => setSelected(false)}
          style={{
            display: Selected ? "block" : "none",
            borderRadius: "16px",
            background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
            color: "#fff",
            padding: "12px 24px",
            border: "none",
            margin: "16px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            cursor: "pointer",
          }}
        >
          Add New Task
        </button>

        <CompletedWrapper
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
          style={{ display: Selected ? "block" : "none" }}
        />
      </div>
    </>
  );
}
export default App;
