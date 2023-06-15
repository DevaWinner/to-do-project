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
  return newTask; 
};

export const deleteTask = (index) => {
  const tasks = loadTasksFromLocalStorage();
  if (typeof index === 'undefined') {
    tasks.length = 0;
  } else {
    tasks.splice(index, 1);
    tasks.forEach((task, i) => {
      task.index = i + 1;
    });
  }
  saveTasksToLocalStorage(tasks);
};

export const editTask = (index, description) => {
  const tasks = loadTasksFromLocalStorage();
  tasks[index].description = description;
  saveTasksToLocalStorage(tasks);
};
