import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TodoListComponent } from './todo/components/todo-list/todo-list';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-app');
}
