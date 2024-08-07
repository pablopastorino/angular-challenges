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
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
@Component({
  selector: 'app-city-card',
  template: `
    <app-card (addNewItem)="addCity()" name="name" [items]="cities">
      <img src="assets/img/city.png" width="200px" />
      <ng-template [cardRow]="cities" let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CommonModule, CardRowDirective, CardComponent, ListItemComponent],
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
