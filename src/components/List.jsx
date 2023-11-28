import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Task from "./Task";

const List = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilters, setStatusFilters] = useState({
    completed: false,
    pending: false,
  });
  const [priorityFilters, setPriorityFilters] = useState({
    high: false,
    medium: false,
    low: false,
  });

  const tasksPerPage = 5;

  const getFilteredTasks = () => {
    let filteredTasks = tasks;

    if (statusFilters.completed || statusFilters.pending) {
      filteredTasks = filteredTasks.filter((task) => {
        return (
          (statusFilters.completed && task.status === 1) ||
          (statusFilters.pending && task.status === 0)
        );
      });
    }

    if (priorityFilters.high || priorityFilters.medium || priorityFilters.low) {
      filteredTasks = filteredTasks.filter((task) => {
        return (
          (priorityFilters.high && task.priority === "high") ||
          (priorityFilters.medium && task.priority === "medium") ||
          (priorityFilters.low && task.priority === "low")
        );
      });
    }

    return filteredTasks;
  };

  const getTasksForPage = () => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;
    return getFilteredTasks().slice(startIndex, endIndex);
  };

  const goToNextPage = () => {
    if (
      (currentPage - 1) * tasksPerPage + tasksPerPage <
      getFilteredTasks().length
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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

  const handleStatusFilterChange = (filterName) => {
    setStatusFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const handlePriorityFilterChange = (filterName) => {
    setPriorityFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const tasksToDisplay = getTasksForPage();

  return (
    <div className="list">
      <div className="list__btn">
        <Link to="/create" className="btn btn--primary">
          Create Task
        </Link>
      </div>

      <h2 className="list__title">Task List</h2>
      <p className="list__subtitle">
        Mark a task as completed by clicking on their respective checkbox
      </p>
      <p className="list__subtitle">Edit a task by clicking on it's name</p>

      <ul className="list__priorities">
        <li className="list__priority list__priority--high">High</li>
        <li className="list__priority list__priority--medium">Medium</li>
        <li className="list__priority list__priority--low">Low</li>
      </ul>

      <h4 className="filters__title">Filters</h4>
      <div className="filters">
        <div className="filter">
          <p className="filter__title">Status</p>
          <ul className="filter__list">
            <li className="filter__item filter__item--completed">
              <label>
                <input
                  type="checkbox"
                  name="completed"
                  checked={statusFilters.completed}
                  onChange={() => handleStatusFilterChange("completed")}
                />
                Completed
              </label>
            </li>
            <li className="filter__item filter__item--pending">
              <label>
                <input
                  type="checkbox"
                  name="pending"
                  checked={statusFilters.pending}
                  onChange={() => handleStatusFilterChange("pending")}
                />
                Pending
              </label>
            </li>
          </ul>
        </div>

        <div className="filter">
          <p className="filter__title">Priority</p>
          <ul className="filter__list">
            <li className="filter__item filter__item--high">
              <label>
                <input
                  type="checkbox"
                  name="high"
                  checked={priorityFilters.high}
                  onChange={() => handlePriorityFilterChange("high")}
                />
                High
              </label>
            </li>
            <li className="filter__item filter__item--medium">
              <label>
                <input
                  type="checkbox"
                  name="medium"
                  checked={priorityFilters.medium}
                  onChange={() => handlePriorityFilterChange("medium")}
                />
                Medium
              </label>
            </li>
            <li className="filter__item filter__item--low">
              <label>
                <input
                  type="checkbox"
                  name="low"
                  checked={priorityFilters.low}
                  onChange={() => handlePriorityFilterChange("low")}
                />
                Low
              </label>
            </li>
          </ul>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p className="list__empty">No tasks available</p>
      ) : (
        <ul>
          {tasksToDisplay.map((task) => (
            <Task
              key={task.id}
              task={task}
              handleCheckboxChange={handleCheckboxChange}
              handleDeleteButtonClick={handleDeleteButtonClick}
            />
          ))}
        </ul>
      )}

      <div className="pagination">
        <button
          className="pagination__btn"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span className="pagination__page">
          {currentPage + "/" + Math.ceil(tasks.length / tasksPerPage)}
        </span>
        <button
          className="pagination__btn"
          onClick={goToNextPage}
          disabled={
            (currentPage - 1) * tasksPerPage + tasksPerPage >= tasks.length
          }
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default List;
