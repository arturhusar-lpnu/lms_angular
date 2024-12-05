import { Injectable } from '@angular/core';
import { AuthService } from './authService';
import { LoginService } from './loginService';
import { HttpClient } from '@angular/common/http';
import { Instructor } from '../../shared/models/instructor';
import { Course } from '../../shared/models/course';
import { Assignment } from '../../shared/models/assignment';
import { CourseResponse } from './studentSevice';
import { Submit } from '../../shared/models/submit';
import { Observable } from 'rxjs';

export interface AssignmentResponse {
  status: string;
  error: any; // change to Error later
  assignments: Assignment[];
}

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private assignmentsApiUrl =
    'https://localhost:7194//api/instructor-assignments/';
  private coursesApiUrl = 'https://localhost:7194//api/instructor-courses/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getCourses(): any {
    const id = this.authService.getUserId();
    return this.http.get<CourseResponse>(
      `${this.coursesApiUrl}/instructor/${id}`
    );
  }
  getAssignment(assignmentId: number): Observable<Assignment> {
    return this.http.get<Assignment>(
      `${this.assignmentsApiUrl}/assignment/${assignmentId}`
    );
  }

  getAssignments(): any {
    const id = this.authService.getUserId();
    return this.http.get<AssignmentResponse>(`${this.assignmentsApiUrl}/${id}`);
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

  removeAssignment(assignmentId: number) {
    return this.http.delete(
      `${this.assignmentsApiUrl}/assignment/${assignmentId}/remove`
    );
  }

  getSubmitReview(assignment: Assignment, submit: Submit) {
    return this.http.get(
      `${this.assignmentsApiUrl}/assignment/${assignment.id}/student-submit/${submit.id}/review`
    );
  }
}
