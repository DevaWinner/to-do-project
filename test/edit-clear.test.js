import { JSDOM } from 'jsdom';
import { editTask } from '../src/todo.js';
import { updateTaskStatus } from '../src/status.js';
import { clearCompletedTasks } from '../src/clear.js';

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
