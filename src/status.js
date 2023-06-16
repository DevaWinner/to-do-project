import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from './todo.js';

export const updateTaskStatus = (index, completed) => {
  const tasks = loadTasksFromLocalStorage();
  tasks[index].completed = completed;
  saveTasksToLocalStorage(tasks);
};
