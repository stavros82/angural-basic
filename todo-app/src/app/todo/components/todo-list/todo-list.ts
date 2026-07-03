import { Component, OnInit, HostListener, inject} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TodoItemComponent} from '../todo-item/todo-item';
import { Todo } from '../../todo.model';

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
  private highlightTimeoutId: ReturnType<typeof setTimeout> | null = null;
  recentTodoId: number | null = null;

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
  return saved ? JSON.parse(saved) : this.getInitialTodos();
}

getInitialTodos(): Todo[] {
  const initialTodos: Todo[] = [
    { id: 1, title: 'Buy milk', done: false },
    { id: 2, title: 'Walk the dog', done: false },
    { id: 3, title: 'Learn Angular', done: true }
  ];

  localStorage.setItem(this.storageKey, JSON.stringify(initialTodos));
  return initialTodos;
}


  saveTodos() {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
  }

addTodo() {
  const title = this.newTodo.trim();
  if (!title) return;

  const newId = Date.now();

  this.todos.push({
    id: newId,
    title,
    done: false
  });

  this.newTodo = '';
  this.filter = 'all';
    console.log('newId:', newId, 'recentTodoId:', this.recentTodoId);
  this.recentTodoId = newId;
      console.log('newId:', newId, 'recentTodoId:', this.recentTodoId);
  this.saveTodos();



  if (this.highlightTimeoutId) {
    clearTimeout(this.highlightTimeoutId);
  }

  this.highlightTimeoutId = setTimeout(() => {
    console.log('clearing highlight now');
 document.body.click();
  }, 12000);
  
  console.log('newId:', newId, 'recentTodoId:', this.recentTodoId);

}

clearHighlight() {
  this.recentTodoId = null;

  if (this.highlightTimeoutId) {
    clearTimeout(this.highlightTimeoutId);
    this.highlightTimeoutId = null;
  }
}


@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement;

  if (target.tagName.toLowerCase() === 'input') {
    return;
  }

  if (target.tagName.toLowerCase() === 'button') {
    return;
  }

  if (this.recentTodoId !== null) {
    this.clearHighlight();
  }
}


  toggleTodo(todo: Todo) {
    todo.done = !todo.done;
    this.filter = 'all';

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
  
  get remainingCount(): number {
     return this.todos.filter(todo => !todo.done).length;
  }

}
