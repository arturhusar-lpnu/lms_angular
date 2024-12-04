import { Injectable } from '@angular/core';
import { AuthService } from './authService';
import { LoginService } from './loginService';
import { HttpClient } from '@angular/common/http';
import { Instructor } from '../../shared/models/instructor';
import { Course } from '../../shared/models/course';
import { Assignment } from '../../shared/models/assignment';
import { CourseResponse } from './studentSevice';
import { Submit } from '../../shared/models/submit';

export interface AssignmentResponse {
  status: string;
  error: any; // change to Error later
  assignment: Assignment;
}

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private assignmentsApiUrl =
    'http://localhost:5098//api/instructor-assignments/';
  private coursesApiUrl = 'http://localhost:5098//api/instructor-courses/';
  constructor(private http: HttpClient, private instructor: Instructor) {}

  getCourses(): any {
    return this.http.get<CourseResponse>(
      `${this.coursesApiUrl}/instructor/${this.instructor.user.id}`
    );
  }

  getAssignments(): any {
    return this.http.get(
      `${this.assignmentsApiUrl}/${this.instructor.user.id}`
    );
  }

  addAssignment(assignment: Assignment) {
    return this.http.post(
      `${this.assignmentsApiUrl}/add-assignment`,
      assignment
    );
  }

  editAssignment(assignment: Assignment) {
    return this.http.put(
      `${this.assignmentsApiUrl}/assignment/${assignment.id}/edit`,
      assignment
    );
  }

  removeAssignment(assignmentId: number) {}

  getSubmitReview(assignment: Assignment, submit: Submit) {
    return this.http.get(
      `${this.assignmentsApiUrl}/assignment/${assignment.id}/student-submit/${submit.id}/review`
    );
  }
}
