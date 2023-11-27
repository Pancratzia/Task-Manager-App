import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksInStorage = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(tasksInStorage);
  }, []); 

  const handleCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: task.status === 0 ? 1 : 0 } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteButtonClick = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <Link to="/create">Create Task</Link>

      <h2>Task List</h2>

      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <Link to={`/edit/${task.id}`} className={task.status === 1 ? "completed" : ""}>
                {task.name} - Priority: {task.priority}
              </Link>

              <button onClick={() => handleDeleteButtonClick(task.id)}>Delete</button>
              
              
                <input
                  type="checkbox"
                  name="completed"
                  checked={task.status === 1}
                  onChange={() => handleCheckboxChange(task.id)}
                />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
