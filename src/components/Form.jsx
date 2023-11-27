import React, { useState } from "react";
import { Link } from "react-router-dom";

const Form = ({ action }) => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "low",
    status: 0, /* 0: pending, 1: completed */ 
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.name) {
      alert("Task name is required!");
      return;
    }

    const taskId = Date.now() + Math.random(); 
    const tasksInStorage = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = { id: taskId, ...task };
    const updatedTasks = [...tasksInStorage, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTask({ name: "", description: "", priority: "low", status: 0 });
    alert("Task added successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <>
      <h2>
        {action === "edit" ? "Edit Task" : "Create Task"}
      </h2>

      <Link to="/" >
        Back to List
      </Link>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Task Name</label>
          <input
            type="text"
            name="name"
            placeholder="Task Name"
            value={task.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Task Description</label>
          <textarea
            name="description"
            placeholder="Task Description"
            value={task.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="status">Priority Level</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
