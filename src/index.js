import './style.css';

const tasks = [
  {
    description: 'Read a journal paper',
    completed: false,
    index: 1,
  },
  {
    description: 'Practice a new song',
    completed: true,
    index: 2,
  },
  {
    description: 'Dance to a new song',
    completed: false,
    index: 3,
  },
  {
    description: 'Watch a new movie',
    completed: false,
    index: 4,
  },
];

const renderTasks = () => {
  const todoList = document.getElementById('todo-list');

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.className = 'task-item';

    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task-wrapper';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    taskWrapper.appendChild(checkbox);

    const taskText = document.createElement('p');
    taskText.innerText = task.description;
    taskText.className = 'task-text';
    if (task.completed) {
      taskText.classList.add('completed');
    }
    taskWrapper.appendChild(taskText);

    const kebabMenu = document.createElement('i');
    kebabMenu.className = 'bx bx-dots-vertical-rounded';
    taskWrapper.appendChild(kebabMenu);

    listItem.appendChild(taskWrapper);
    todoList.appendChild(listItem);
  });
};

document.addEventListener('DOMContentLoaded', renderTasks);
