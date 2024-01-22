import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {JsonPipe, NgClass} from "@angular/common";
import {Todo} from "../../model/todo";

@Component({
  selector: 'app-todos-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    JsonPipe
  ],
  template: `
    <ul>
      @for (todo of todos; track todo.id) {
        <li class="flex justify-between">
          <div class="flex gap-3">
            <input
              type="checkbox" [checked]="todo.completed"
              (change)="toggleTodo.emit(todo)"
            >
            <span [ngClass]="{'line-through': todo.completed}">
                          {{todo.title}}
                      </span>
          </div>
          <button (click)="removeTodo.emit(todo)">❌</button>
        </li>
      }
    </ul>
    <pre>{{todos | json}}</pre>
  `,
  styles: ``
})
export class TodosListComponent {
  @Input() todos: Todo[] =[]
  @Output() toggleTodo = new EventEmitter<Todo>()
  @Output() removeTodo = new EventEmitter<Todo>()
}
