
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../todo.model';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';



@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.html',
  styleUrls: ['./todo-item.css']
})
export class TodoItemComponent implements OnChanges {
  @Input() todo!: Todo;
  @Input() editingTodoId: number | null = null;
  @Input() editingTitle = '';
  @Input() recentTodoId: number | null = null;

  @Output() toggle = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number>();
  @Output() startEdit = new EventEmitter<Todo>();
  @Output() saveEdit = new EventEmitter<Todo>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() editingTitleChange = new EventEmitter<string>();

   ngOnInit() {
    console.log('TodoItemComponent created for todo:', this.todo);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('TodoItemComponent changes:', changes);
    console.log('recentTodoId in child:', this.recentTodoId);
  }
}

