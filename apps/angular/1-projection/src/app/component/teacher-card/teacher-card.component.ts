import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card (addNewItem)="this.store.addOne(randTeacher())">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-content ngProjectAs="items">
        @for (item of teachers; track item.id) {
          <app-list-item (delete)="store.deleteOne(item.id)">
            {{ item.firstName }}
          </app-list-item>
        }
      </ng-content>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit, AfterViewChecked {
  teachers: Teacher[] = [];
  randTeacher: () => Teacher = randTeacher;
  @ViewChild(CardComponent, { static: true, read: ElementRef })
  card!: ElementRef;

  constructor(
    private http: FakeHttpService,
    public store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  ngAfterViewChecked() {
    this.card.nativeElement.children[0].style.backgroundColor =
      'rgba(250, 0, 0, 0.1)';
  }
}
