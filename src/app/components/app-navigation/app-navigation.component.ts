import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/authService';
import { CourseService } from '../../services/courseService';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './app-navigation.component.html',
  styleUrl: './app-navigation.component.css',
})
export class AppNavigationComponent {
  constructor(
    private authService: AuthService,
    private courseService: CourseService
  ) {}
  getUserRole() {
    return this.authService.getUserRole();
  }
  isCourseSelected(): boolean {
    return this.courseService.getSelectedCourse() ? true : false;
  }
}
