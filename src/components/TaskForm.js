import React, { useState } from "react";
import "../styles/TaskForm.css";

function TaskForm({ addTask }) {
  // State variables for form inputs and error message
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation: Check if all fields are filled
    if (!title.trim() || !dueDate.trim() || !priority.trim()) {
      setError("Please fill in all fields");
      return;
    }
    // Call addTask function to add new task
    addTask({ title, dueDate, priority, id: Date.now() });
    // Clear form inputs and error message
    setTitle("");
    setDueDate("");
    setPriority("");
    setError("");
  };

  return (
    <div className="task-form-container">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Title input */}
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        {/* Due date input */}
        <label>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        {/* Priority selection */}
        <label>
          Priority:
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
        {/* Error message */}
        {error && <p className="error-message">{error}</p>}
        {/* Submit button */}
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
