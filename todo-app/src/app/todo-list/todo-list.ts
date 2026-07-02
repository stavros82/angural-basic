import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TodoItemComponent, Todo } from '../todo-item/todo-item';

type Filter = 'all' | 'active' | 'done';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.css']
})
export class TodoListComponent implements OnInit {
  newTodo = '';
  editingTodoId: number | null = null;
  editingTitle = '';
  filter: Filter = 'all';

  private storageKey = 'todos';
  private platformId = inject(PLATFORM_ID);

  todos: Todo[] = [];

  ngOnInit() {
    this.todos = this.loadTodos();
  }

  get filteredTodos(): Todo[] {
    if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.done);
    }

    if (this.filter === 'done') {
      return this.todos.filter(todo => todo.done);
    }

    return this.todos;
  }

  loadTodos(): Todo[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }

    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : [];
  }

  saveTodos() {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
  }

  addTodo() {
    const title = this.newTodo.trim();
    if (!title) return;

    this.todos.push({
      id: Date.now(),
      title,
      done: false
    });

    this.newTodo = '';
    this.saveTodos();
  }

  toggleTodo(todo: Todo) {
    todo.done = !todo.done;
    this.saveTodos();
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  startEdit(todo: Todo) {
    this.editingTodoId = todo.id;
    this.editingTitle = todo.title;
  }

  saveEdit(todo: Todo) {
    const title = this.editingTitle.trim();
    if (!title) return;

    todo.title = title;
    this.editingTodoId = null;
    this.editingTitle = '';
    this.saveTodos();
  }

  cancelEdit() {
    this.editingTodoId = null;
    this.editingTitle = '';
  }

  setFilter(filter: Filter) {
    this.filter = filter;
  }
}
