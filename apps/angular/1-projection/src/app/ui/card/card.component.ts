import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content select="img"></ng-content>
      <section>
        @for (item of items; track item.id) {
          <app-list-item (delete)="deleteItem.emit(item.id)">
            {{ item[name] }}
          </app-list-item>
        }
      </section>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgFor, ListItemComponent],
})
export class CardComponent<T extends { id: number; [key: string]: any }> {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) items!: T[];
  @Output() addNewItem = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<number>();
}
