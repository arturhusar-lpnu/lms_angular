import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/courseService';
import { Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { Course } from '../../../../shared/models/course';
@Component({
  selector: 'app-courses-page',
  imports: [CommonModule, NgFor],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css',
})
export class CoursesPageComponent implements OnInit {
  courses$: Observable<Course[]> = null!;
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    console.log(this.courseService.getCourses());
    this.courses$ = this.courseService.getCourses();
  }

  selectCourse(course: Course) {
    this.courseService.selectCourse(course); // to get it from assignments
  }
}
