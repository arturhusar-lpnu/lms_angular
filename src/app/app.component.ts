import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Student } from '../shared/models/student';
import { FormsModule } from '@angular/forms';

const filters = [
  (student: Student) => student,
  (student: Student) => !student.isActive,
  (student: Student) => student.isActive,
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, NgIf, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  students: Student[] = [
    new Student('Goid Stepanovich', 'PZ-99'),
    new Student('Gouda Stepan', 'KN-007', false),
  ];
  newStudentName: string = '';
  newGroupName: string = '';
  listFilter: any = '0';
  title = 'lms';
  toggleStudent(student: Student) {
    student.isActive = !student.isActive;
    console.log(student);
  }
  addNewStudent() {
    if (this.newStudentName && this.newGroupName) {
      const newStudent = new Student(this.newStudentName, this.newGroupName);
      this.students.push(newStudent);

      // Reset form fields
      this.newStudentName = '';
      this.newGroupName = '';
    }
  }
  get visibleStudents(): Student[] {
    return this.students.filter(filters[this.listFilter]);
  }
}
