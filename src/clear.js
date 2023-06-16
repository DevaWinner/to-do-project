import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from './todo.js';

export const clearCompletedTasks = () => {
  const tasks = loadTasksFromLocalStorage();
  const updatedTasks = tasks.filter((task) => !task.completed);
  saveTasksToLocalStorage(updatedTasks);
};