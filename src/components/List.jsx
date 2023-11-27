import React from "react";
import { Link } from "react-router-dom";

const List = () => {
  // Obtener las tareas desde el localStorage
  const tasksInStorage = JSON.parse(localStorage.getItem("tasks")) || [];

  return (
    <div>
      <Link to="/create">
        Create Task
      </Link>

      <h2>Task List</h2>

      {tasksInStorage.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasksInStorage.map((task) => (
            <li key={task.id}>
              <Link to={`/edit/${task.id}`}>
                {task.name} - Priority: {task.priority}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
