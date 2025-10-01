function Completed() {
  return (
    <>
      <div className="to-do-list">
        <h1 className="fancy-title">To-Do-List</h1>

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
              <MainTask task={task} onDelete={() => deleteTask(index)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
