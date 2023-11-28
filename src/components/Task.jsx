import React from "react";
import { Link } from "react-router-dom";

const Task = ({ task, handleDeleteButtonClick, handleCheckboxChange }) => {
  const today = new Date();
  const formatToday =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  return (
    <li
      className={
        task.priority === "high"
          ? "list__item list__item--high"
          : task.priority === "low"
          ? "list__item list__item--low"
          : "list__item list__item--medium"
      }
      key={task.id}
    >
      <div className="item__description">
        <input
          type="checkbox"
          name="completed"
          className="item__checkbox"
          checked={task.status === 1}
          onChange={() => handleCheckboxChange(task.id)}
        />

        <Link
          to={`/edit/${task.id}`}
          className={
            task.status === 1
              ? "item__status item__status--completed"
              : "item__status item__status--pending"
          }
        >
          {task.name} 
        </Link>

        <span className={task.dueDate<formatToday ? "item__date item__date--overdue" : "item__date"}>({task.dueDate<formatToday ? "Overdue" : task.dueDate })</span>
      </div>

      <button
        className="item__delete"
        onClick={() => handleDeleteButtonClick(task.id)}
      >
        ✕
      </button>
    </li>
  );
};

export default Task;
