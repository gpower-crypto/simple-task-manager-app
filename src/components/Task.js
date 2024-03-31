import React, { useState } from "react";
import "../styles/Task.css";

function Task({ task, onDelete, onToggleComplete, onEdit }) {
  // Destructure task properties
  const { id, title, dueDate, priority, completed } = task;

  // State for editing mode and edited task
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  // Toggle task completion status
  const handleToggleComplete = () => {
    onToggleComplete(id);
  };

  // Enable editing mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Save edited task
  const handleSaveEdit = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  // Handle input changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  return (
    <div className="task">
      {!isEditing ? ( // Display task details or edit form based on editing mode
        <>
          <input
            type="checkbox"
            checked={completed}
            onChange={handleToggleComplete}
          />
          <h3>{title}</h3>
          <p>Due Date: {dueDate}</p>
          <p>Priority: {priority}</p>
          <button onClick={handleEdit}>Edit</button>
        </>
      ) : (
        <div>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
          />
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={handleSaveEdit}>Save</button>
        </div>
      )}
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

export default Task;
