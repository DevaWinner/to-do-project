export const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const addTask = (description) => {
  const tasks = loadTasksFromLocalStorage();
  const index = tasks.length + 1;
  const newTask = {
    description,
    completed: false,
    index,
  };
  tasks.push(newTask);
  saveTasksToLocalStorage(tasks);
};
