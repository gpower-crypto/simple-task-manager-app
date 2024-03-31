import React, { useState } from "react";
import Task from "./Task";
import "../styles/TaskList.css";

function TaskList({ tasks, updateTask, deleteTask, editTask }) {
  // State variables for search term, priority filter, and completion filter
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [completionFilter, setCompletionFilter] = useState("all");

  // Function to handle task completion toggle
  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    updateTask(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Function to handle task editing
  const handleEdit = (editedTask) => {
    editTask(editedTask);
  };

  // Function to handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle priority filter change
  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  // Function to handle completion filter change
  const handleCompletionFilterChange = (e) => {
    setCompletionFilter(e.target.value);
  };

  // Function to render a task category
  const renderTaskList = (taskCategory) => (
    <div className="task-category">
      <h2>{taskCategory.title}</h2>
      <ul className="task-list">
        {taskCategory.tasks.map((task) => (
          <li key={task.id}>
            <Task
              task={task}
              onDelete={deleteTask}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEdit}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  // Filter tasks based on search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter tasks based on priority
  const filteredByPriorityTasks =
    priorityFilter === ""
      ? filteredTasks
      : filteredTasks.filter((task) => task.priority === priorityFilter);

  // Filter tasks based on completion status
  const filteredByCompletionTasks =
    completionFilter === "all"
      ? filteredByPriorityTasks
      : completionFilter === "completed"
      ? filteredByPriorityTasks.filter((task) => task.completed)
      : filteredByPriorityTasks.filter((task) => !task.completed);

  // Separate tasks into categories (upcoming, overdue, completed)
  const upcomingTasks = filteredByCompletionTasks.filter(
    (task) => !task.completed && new Date(task.dueDate) > new Date()
  );
  const overdueTasks = filteredByCompletionTasks.filter(
    (task) => !task.completed && new Date(task.dueDate) < new Date()
  );
  const completedTasks = filteredByCompletionTasks.filter(
    (task) => task.completed
  );

  return (
    <div className="task-list-container">
      {/* Filter section */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          value={priorityFilter}
          onChange={handlePriorityFilterChange}
          className="priority-filter"
        >
          <option value="">Filter by Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={completionFilter}
          onChange={handleCompletionFilterChange}
          className="completion-filter"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      {/* Render task categories */}
      {filteredByCompletionTasks.length > 0 ? (
        <>
          {upcomingTasks.length > 0 &&
            renderTaskList({ title: "Upcoming Tasks", tasks: upcomingTasks })}
          {overdueTasks.length > 0 &&
            renderTaskList({ title: "Overdue Tasks", tasks: overdueTasks })}
          {completedTasks.length > 0 &&
            renderTaskList({
              title: "Completed Tasks",
              tasks: completedTasks,
            })}
        </>
      ) : (
        <p>No tasks yet</p>
      )}
    </div>
  );
}

export default TaskList;
