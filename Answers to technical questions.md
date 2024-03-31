# Answers to Technical Questions

1. **How long did you spend on the coding test?**

   I spent around 2 hours to complete the application.

2. **What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.**

   Some very useful features introduced in recent versions of React (since 2019) is React Hooks, especially the useEffect hook. useEffect allows to perform side effects in function components. So we don't need to use lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount in class components.

   It also allows to manage side effects in a more organized and efficient way compared to class-based components

   One example where I have used useEffect is in the Dashboard component to load tasks from localStorage when the component mounts and save tasks to localStorage whenever the tasks state changes:

   ```javascript
   import React, { useState, useEffect } from "react";
   import TaskList from "./TaskList";
   import TaskForm from "./TaskForm";

   function Dashboard() {
     const [tasks, setTasks] = useState([]);

     // Load tasks from localStorage when the component mounts
     useEffect(() => {
       const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
       setTasks(storedTasks);
     }, []);

     // Save tasks to localStorage whenever tasks state changes
     useEffect(() => {
       localStorage.setItem("tasks", JSON.stringify(tasks));
     }, [tasks]);

     // ...
   }
   ```

3. **How would you track down a performance issue in production? Have you ever had to do this?**

   I would use the React Developer Tools (Profiler) to measure the performance of certain components. It helps to find any unnecessary re-renders that slow down the app. I have used React Developer Tools for most of my react projects to see how components are rendered and change as I interact with the app.

   I would analyze logs to identify any errors or warnings that might be leading to the performance issue and would see any patterns or trends that might indicate a problem. I have used logs for my projects to trace errors when interacting with app's features.

4. **If you had more time, what additional features or improvements would you consider adding to the task management application?**

   1. I would add user authentication and authorization to allow users to sign up, login/logout, and manage their own tasks.

   2. Users could categorize their tasks for better organization and filtering. So users can group tasks by category, priority, due date, or any custom criteria they want.

   3. I would implement reminders and notifications to remind users of upcoming tasks or deadlines.

   4. The app could also allow users to add comments and attachments to tasks

   5. It could have a calendar view to give users a visual representation of their tasks and deadlines
