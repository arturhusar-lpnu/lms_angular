import { Injectable } from '@angular/core';
import { AuthService } from './authService';
import { StudentService } from './studentSevice';
import { InstructorService } from './instructorService';
import { Course } from '../../shared/models/course';
import { AdminService } from './adminService';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  selectedCourse!: Course;
  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private adminService: AdminService,
    private instructorService: InstructorService
  ) {}

  getCourses() {
    const userRole = this.getUserRole();
    if (userRole === 'Student') {
      console.log(this.studentService.getCourses());
      return this.studentService.getCourses();
    } else if (userRole === 'Administrator') {
      return this.adminService.getAdminCourses();
    } else {
      return this.instructorService.getCourses();
    }
  }

  selectCourse(course: Course) {
    this.selectedCourse = course;
  }
  getSelectedCourse(): Course {
    return this.selectedCourse;
  }

  getUserRole() {
    return this.authService.getUserRole();
  }
}
