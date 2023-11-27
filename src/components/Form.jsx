import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "low",
    status: 0, /* 0: pending, 1: completed */ 
  });

  useEffect(() => {
    if (id) {
      const tasksInStorage = JSON.parse(localStorage.getItem("tasks")) || [];
      const existingTask = tasksInStorage.find((t) => t.id === parseInt(id));

      if (existingTask) {
        setTask(existingTask);
      } else {
        alert("Task not found");
        navigate("/");
      }
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.name) {
      alert("Task name is required!");
      return;
    }

    const tasksInStorage = JSON.parse(localStorage.getItem("tasks")) || [];

    if (id) {
      const updatedTasks = tasksInStorage.map((t) =>
        t.id === parseInt(id) ? { ...t, ...task } : t
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      const taskId = tasksInStorage.length + 1; 
      const newTask = { id: taskId, ...task };
      const updatedTasks = [...tasksInStorage, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    setTask({ name: "", description: "", priority: "low", status: 0 });
    alert("Task saved successfully!");
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <>
      <h2>
        {id ? "Edit Task" : "Create Task"}
      </h2>

      <Link to="/">
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

