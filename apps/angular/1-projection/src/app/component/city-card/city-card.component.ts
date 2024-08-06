import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      itemName="name"
      [store]="store"
      [randomData]="randCity"
      imgSrc="assets/img/city.png"
      [backgroundColor]="backgroundColor"></app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  randCity: () => City = randomCity;
  backgroundColor = 'rgba(0, 0, 250, 0.1)';

  constructor(
    private http: FakeHttpService,
    public store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((t) => this.store.addAll(t));
    this.store.cities$.subscribe((t) => (this.cities = t));
  }
}
