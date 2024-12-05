import { Injectable } from '@angular/core';
import { AuthService } from './authService';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../shared/models/student';
import { Submit } from '../../shared/models/submit';
import { Course } from '../../shared/models/course';
import { Review } from '../../shared/models/review';
import { Assignment } from '../../shared/models/assignment';
import { Observable } from 'rxjs';

export interface SubmitReviewResponse {
  status: string;
  error: any;
  submit: Submit;
  review: Review;
}

export interface CourseResponse {
  status: string;
  error: any;
  course: Course;
}
export interface AssignmentResponse {
  assignments: Assignment[];
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private assignmentsApiUrl = 'https://localhost:7194/api/student-assignments';
  private coursesApiUrl = 'https://localhost:7194/api/student-courses';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getCourses(): any {
    const id = this.authService.getUserId();
    return this.http.get(`${this.coursesApiUrl}/student/${id}`);
  }

  getAssignment(assignmentId: number): Observable<Assignment> {
    return this.http.get<Assignment>(
      `${this.assignmentsApiUrl}/assignment/${assignmentId}`
    );
  }

  getAssignments(): any {
    const studentId = this.authService.getUserId();
    return this.http.get<AssignmentResponse>(
      `${this.assignmentsApiUrl}/assignments/student/${studentId}`
    );
  }

  submitAssignment(assignmentId: number, submit: Submit): any {
    return this.http.post<SubmitReviewResponse>(
      `${this.assignmentsApiUrl}/assignment/${assignmentId}/submit-assignment`,
      submit
    );
  }

  editSubmit(assignmentId: number, submitId: number, submit: Submit) {
    return this.http.put(
      `${this.assignmentsApiUrl}/assignment/${assignmentId}/submit/${submitId}/edit`,
      submit
    );
  }

  revertSubmit(assignmentId: number, submitId: number) {
    return this.http.delete(
      `${this.assignmentsApiUrl}/assignment/${assignmentId}/submit/${submitId}/revert`
    );
  }

  getReview(assignmentId: number, submitId: number): any {
    return this.http.get<SubmitReviewResponse>(
      `${this.assignmentsApiUrl}/assignment/${assignmentId}/submit/${submitId}`
    );
  }
  getSubmit(assignmentId: number): any {
    return this.http.get<SubmitReviewResponse>( // додумати шо вертає шоб вивести submit дані а не лише id
      `${this.assignmentsApiUrl}/assignment/${assignmentId}/submit`
    );
  }
}
