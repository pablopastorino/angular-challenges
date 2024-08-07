import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { CardRowDirective } from './card-row.directive';

@Component({
  selector: 'app-card',
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  template: `
    <ng-content select="img"></ng-content>
    <section>
      @for (item of items(); track item.id) {
        <ng-template
          [ngTemplateOutlet]="cardRow()"
          [ngTemplateOutletContext]="{ $implicit: item }" />
      }
    </section>
    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem.emit()">
      Add
    </button>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, NgTemplateOutlet, CardRowDirective],
})
export class CardComponent<T extends { id: number }> {
  items = input.required<T[]>();
  addNewItem = output<void>();
  cardRow = contentChild.required(CardRowDirective, { read: TemplateRef });
}
