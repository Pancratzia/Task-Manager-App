import React from "react";
import { Link } from "react-router-dom";

const Task = ({ task, handleDeleteButtonClick, handleCheckboxChange }) => {
  return (
    <li className="list__item" key={task.id}>
      <div className="item__description">
        <input
          type="checkbox"
          name="completed"
          checked={task.status === 1}
          onChange={() => handleCheckboxChange(task.id)}
        />

        <Link
          to={`/edit/${task.id}`}
          className={
            task.status === 1 ? "item item--completed" : "item item--pending"
          }
        >
          {task.name} -{" "}
          <span
            className={
              task.priority === "low"
                ? "item__priority item__priority--low"
                : task.priority === "medium"
                ? "item__priority item__priority--medium"
                : "item__priority item__priority--high"
            }
          ></span>
        </Link>
      </div>

      <button onClick={() => handleDeleteButtonClick(task.id)}>X</button>
    </li>
  );
};

export default Task;
