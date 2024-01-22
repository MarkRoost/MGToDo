import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-todos-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <input
      type="text"
      class="input input-bordered"
      #inputRef
      (keydown.enter)="addTodo.emit(inputRef)"
      placeholder="add todo"
    >

  `,
  styles: ``
})
export class TodosFormComponent {
  @Output() addTodo = new EventEmitter<HTMLInputElement>();
}
