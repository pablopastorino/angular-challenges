import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '../model/store.model';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore implements Store<Student> {
  private students = new BehaviorSubject<Student[]>([]);
  students$ = this.students.asObservable();

  addAll(students: Student[]) {
    this.students.next(students);
  }

  addOne(student: Student) {
    this.students.next([...this.students.value, student]);
  }

  deleteOne(id: number) {
    this.students.next(this.students.value.filter((s) => s.id !== id));
  }
}
