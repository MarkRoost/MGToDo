import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-todos-summary',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      {{completed}} completed | {{ todos }} todos
    </div>
  `,
  styles: ``
})
export class TodosSummaryComponent {
  @Input() completed: number | undefined
  @Input() todos: number | undefined
}
