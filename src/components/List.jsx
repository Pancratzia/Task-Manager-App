import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Task from "./Task";

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
    <div className="list">

      <div className="list__btn">
        <Link to="/create" className="btn btn--primary">Create Task</Link>
      </div>

      <h2 className="list__title">Task List</h2>
      <p className="list__subtitle">Mark a task as completed by clicking on their respective checkbox</p>

      {tasks.length === 0 ? (
        <p className="list__empty">No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <Task key={task.id} task={task} handleCheckboxChange={handleCheckboxChange} handleDeleteButtonClick={handleDeleteButtonClick} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
