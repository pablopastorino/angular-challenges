import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students"
      itemName="firstName"
      [store]="store"
      [randomData]="randStudent"
      imgSrc="assets/img/student.webp"
      [backgroundColor]="backgroundColor"></app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  randStudent: () => Student = randStudent;
  backgroundColor = 'rgba(0, 250, 0, 0.1)';

  constructor(
    private http: FakeHttpService,
    public store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
    this.store.students$.subscribe((s) => (this.students = s));
  }
}
