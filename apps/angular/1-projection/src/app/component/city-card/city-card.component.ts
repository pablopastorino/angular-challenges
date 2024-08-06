import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      (addNewItem)="addCity()"
      (deleteItem)="deleteCity($event)"
      name="name"
      [items]="cities"
      ]>
      <img src="assets/img/city.png" width="200px" />
      <ng-content ngProjectAs="items">
        @for (item of cities; track item.id) {
          <app-list-item (delete)="deleteCity(item.id)">
            {{ item.name }}
          </app-list-item>
        }
      </ng-content>
    </app-card>
  `,
  standalone: true,
  imports: [CommonModule, CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit, AfterViewChecked {
  cities: City[] = [];
  @ViewChild(CardComponent, { static: true, read: ElementRef })
  card!: ElementRef;

  constructor(
    private http: FakeHttpService,
    public store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
    this.store.cities$.subscribe((t) => (this.cities = t));
  }

  ngAfterViewChecked() {
    this.card.nativeElement.children[0].style.backgroundColor =
      'rgba(0, 0, 250, 0.1)';
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
