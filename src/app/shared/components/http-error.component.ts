import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-http-error',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-red-400 rounded-xl p-3 text-black">
      {{msg}}
    </div>
  `,
  styles: ``
})
export class HttpErrorComponent {
  @Input() msg = ''
}
