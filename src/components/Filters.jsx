import React from "react";

const Filters = ({
  statusFilters,
  priorityFilters,
  handleStatusFilterChange,
  handlePriorityFilterChange,
}) => {
  return (
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
  );
};

export default Filters;
