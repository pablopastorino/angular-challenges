import { Directive, input } from '@angular/core';

@Directive({
  selector: 'ng-template[cardRow]',
  standalone: true,
})
export class CardRowDirective<T> {
  cardRow = input.required<T[]>();
}
