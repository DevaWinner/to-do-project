import './style.css';
import {
  loadTasksFromLocalStorage, saveTasksToLocalStorage, addTask, deleteTask, editTask,
} from './todo.js';
import {updateTaskStatus} from './status.js';

const todoList = document.getElementById('todo-list');
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const clearButton = document.getElementById('clear-button');
let createCheckbox;

const renderTasks = () => {
  todoList.innerHTML = '';

  const tasks = loadTasksFromLocalStorage();

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    listItem.dataset.index = index;

    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task-wrapper';

    const checkbox = createCheckbox(task.completed, index);
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

    const deleteButton = document.createElement('i');
    deleteButton.className = 'bx bx-trash delete-button';
    taskWrapper.appendChild(deleteButton);

    listItem.appendChild(taskWrapper);
    todoList.appendChild(listItem);
  });

  saveTasksToLocalStorage(tasks);
};

createCheckbox = (checked, index) => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';
  checkbox.checked = checked;

  checkbox.addEventListener('change', (event) => {
    const { checked } = event.target;
    updateTaskStatus(index, checked);
    renderTasks();
  });

  return checkbox;
};

addTaskButton.addEventListener('click', () => {
  const description = taskInput.value.trim();
  if (description !== '') {
    addTask(description);
    renderTasks();
    taskInput.value = '';
  }
});

taskInput.addEventListener('keydown', (event) => {
  const description = taskInput.value.trim();
  if (event.key === 'Enter' && description !== '') {
    addTask(description);
    renderTasks();
    taskInput.value = '';
  }
});

export const clearCompletedTasks = () => {
  const tasks = loadTasksFromLocalStorage();
  const updatedTasks = tasks.filter((task) => !task.completed);
  saveTasksToLocalStorage(updatedTasks);
  renderTasks();
};

clearButton.addEventListener('click', clearCompletedTasks);

todoList.addEventListener('click', (event) => {
  const { target } = event;
  if (target.classList.contains('bx-dots-vertical-rounded')) {
    const taskWrapper = target.parentNode;
    taskWrapper.classList.toggle('show-delete');
  } else if (target.classList.contains('delete-button')) {
    const listItem = target.closest('.task-item');
    const index = Number(listItem.dataset.index);
    deleteTask(index);
    renderTasks();
  }
});

todoList.addEventListener('click', (event) => {
  const { target } = event;
  if (target.classList.contains('task-text')) {
    target.contentEditable = true;
    target.focus();
  }
});

todoList.addEventListener('blur', (event) => {
  const { target } = event;
  if (target.classList.contains('task-text')) {
    target.contentEditable = false;
    const listItem = target.closest('.task-item');
    const index = Number(listItem.dataset.index);
    const description = target.innerText.trim();
    editTask(index, description);
    renderTasks();
  }
}, true);

document.addEventListener('DOMContentLoaded', renderTasks);