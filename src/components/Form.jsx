import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { v4 as uuid } from "uuid";

const Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "low",
    status: 0 /* 0: pending, 1: completed */,
    dueDate: "",
  });

  useEffect(() => {
    if (id) {
      const tasksInStorage = JSON.parse(localStorage.getItem("tasks")) || [];
      const existingTask = tasksInStorage.find((t) => t.id === id);

      if (existingTask) {
        setTask(existingTask);
      } else {
        navigate("/");
      }
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.name) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Task name is required!',
      })
      return;
    }

    const today = new Date();
    const formatToday =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    if (!task.dueDate || task.dueDate < formatToday) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Due date is required and must be in the future!',
      })
      return;
    }

    const tasksInStorage = JSON.parse(localStorage.getItem("tasks")) || [];

    if (id) {
      const updatedTasks = tasksInStorage.map((t) =>
        t.id === id ? { ...t, ...task } : t
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      let taskId;
      do {
        taskId = uuid();
      } while (tasksInStorage.find((t) => t.id === taskId));
      const newTask = { id: taskId, ...task };
      const updatedTasks = [...tasksInStorage, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    setTask({
      name: "",
      description: "",
      priority: "low",
      status: 0,
      dueDate: "",
    });
    
    Swal.fire({
      icon: 'success',
      title: 'Good job!',
      text: 'Task saved successfully!',
    })

    if (id) {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <div className="form__container">
      <h2 className="form__title">{id ? "Edit Task" : "Create Task"}</h2>

      <div className="form__btn">
        <Link className="btn btn--secondary" to="/">
          Back to List
        </Link>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <fieldset className="form__fieldset">
          <legend className="form__legend">Task Details</legend>
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Task Name"
              value={task.name}
              onChange={handleChange}
              className="form__input form__input--text"
              required
            />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Task Description"
              value={task.description}
              onChange={handleChange}
              className="form__input form__input--textarea"
            ></textarea>
          </div>

          <div className="form__grid">
            <div className="form__group">
              <label className="form__label" htmlFor="priority">
                Priority
              </label>
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="form__input form__input--select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form__group">
              <label className="form__label" htmlFor="dueDate">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                className="form__input form__input--date"
                required
              />
            </div>
          </div>
        </fieldset>
        <button className="btn btn--primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
