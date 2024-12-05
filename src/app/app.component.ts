import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NgFor, NgIf } from '@angular/common';
import { Student } from '../shared/models/student';
// import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  toggleStudent(student: Student) {
    student.isActive = !student.isActive;
    console.log(student);
  }
}
