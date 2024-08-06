import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      (addNewItem)="addStudent()"
      (deleteItem)="deleteStudent($event)"
      name="firstName"
      [items]="students"
      ]>
      <img src="assets/img/student.webp" width="200px" />
      <ng-content ngProjectAs="items"></ng-content>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit, AfterViewChecked {
  students: Student[] = [];
  @ViewChild(CardComponent, { static: true, read: ElementRef })
  card!: ElementRef;

  constructor(
    private http: FakeHttpService,
    public store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
    this.store.students$.subscribe((s) => (this.students = s));
  }

  ngAfterViewChecked() {
    this.card.nativeElement.children[0].style.backgroundColor =
      'rgba(0, 250, 0, 0.1)';
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
