import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '../../model/store.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [style.backgroundColor]="backgroundColor">
      <img [src]="imgSrc" width="200px" />
      <section>
        <app-list-item
          *ngFor="let item of list"
          [name]="item[itemName]"
          [id]="item.id"
          [store]="store"></app-list-item>
      </section>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent<T extends { id: number; [key: string]: any }> {
  @Input() list: T[] | null = null;
  @Input() backgroundColor = '';
  @Input() store!: Store<T>;
  @Input() imgSrc!: string;
  @Input() randomData!: () => T;
  @Input() itemName = 'name';

  addNewItem() {
    this.store.addOne(this.randomData());
  }
}
