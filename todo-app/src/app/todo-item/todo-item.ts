import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type Todo = {
  id: number;
  title: string;
  done: boolean;
};

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.html',
  styleUrls: ['./todo-item.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Input() editingTodoId: number | null = null;
  @Input() editingTitle = '';

  @Output() toggle = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number>();
  @Output() startEdit = new EventEmitter<Todo>();
  @Output() saveEdit = new EventEmitter<Todo>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() editingTitleChange = new EventEmitter<string>();
}
