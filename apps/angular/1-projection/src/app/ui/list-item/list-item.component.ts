import { Component, Input } from '@angular/core';
import { Store } from '../../model/store.model';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border-grey-300 flex justify-between border px-2 py-1">
      {{ name }}
      <button (click)="delete(id)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </div>
  `,
  standalone: true,
})
export class ListItemComponent<T> {
  @Input() store!: Store<T>;
  @Input() id!: number;
  @Input() name!: string;

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
