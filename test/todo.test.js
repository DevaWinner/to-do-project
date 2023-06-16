import { JSDOM } from 'jsdom';
import { addTask, deleteTask } from '../src/todo.js';

// First, I will Mock localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

// Then I will Set up a simulated DOM environment
const { document } = new JSDOM('<!DOCTYPE html><html><body></body></html>').window;
global.document = document;
global.window = document.defaultView;

// Then I wil mock the dom
const taskList = document.createElement('ul');
taskList.id = 'todo-list';
document.body.appendChild(taskList);

describe('addTask', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('adds a task to localStorage', () => {
    addTask('Test task');
    expect(localStorage.setItem).toHaveBeenCalledWith('tasks', '[{"description":"Test task","completed":false,"index":1}]');
  });

  test('returns the new task', () => {
    const newTask = addTask('Test task');
    expect(newTask).toEqual({
      description: 'Test task',
      completed: false,
      index: 1,
    });
  });
});

describe('deleteTask', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('deletes a task from localStorage', () => {
    addTask('Test task');
    deleteTask(0);
    expect(localStorage.setItem).toHaveBeenCalledWith('tasks', '[]');
  });

  test('deletes all tasks from localStorage', () => {
    addTask('Test task');
    addTask('Test task 2');
    deleteTask();
    expect(localStorage.setItem).toHaveBeenCalledWith('tasks', '[]');
  });
});
