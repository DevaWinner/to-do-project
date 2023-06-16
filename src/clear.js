import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from './todo.js';

const clearCompletedTasks = () => {
  const tasks = loadTasksFromLocalStorage();
  const updatedTasks = tasks.filter((task) => !task.completed);
  saveTasksToLocalStorage(updatedTasks);
};

export default clearCompletedTasks;