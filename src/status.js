import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from './todo.js';

const updateTaskStatus = (index, completed) => {
  const tasks = loadTasksFromLocalStorage();
  tasks[index].completed = completed;
  saveTasksToLocalStorage(tasks);
};

export default updateTaskStatus;