import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      itemName="firstName"
      [store]="store"
      [randomData]="randTeacher"
      imgSrc="assets/img/teacher.png"
      [backgroundColor]="backgroundColor"></app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  randTeacher: () => Teacher = randTeacher;
  backgroundColor = 'rgba(250, 0, 0, 0.1)';

  constructor(
    private http: FakeHttpService,
    public store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }
}
