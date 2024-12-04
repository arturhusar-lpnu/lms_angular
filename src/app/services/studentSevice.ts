import { Injectable } from '@angular/core';
import { AuthService } from './authService';
import { LoginService } from './loginService';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../shared/models/student';
import { Submit } from '../../shared/models/submit';
import { Course } from '../../shared/models/course';
import { Review } from '../../shared/models/review';

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

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private assignmentsApiUrl =
    'http://localhost:5098//api/student-assignments/assignment/';
  private coursesApiUrl = 'http://localhost:5098//api/student-courses/';
  constructor(private http: HttpClient, private student: Student) {}

  getCourses(): any {
    return this.http.get(
      `${this.coursesApiUrl}/student/${this.student.user.id}`
    );
  }

  submitAssignment(assignmentId: number, submit: Submit): any {
    return this.http.post<SubmitReviewResponse>(
      `${this.assignmentsApiUrl}/${assignmentId}/submit-assignment`,
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

  getReview(submitId: number): any {
    return this.http.get<SubmitReviewResponse>(
      `${this.assignmentsApiUrl}/assignmentId/submit/${submitId}`
    );
  }
  getSubmit(submitId: number): any {
    return this.http.get<SubmitReviewResponse>( // додумати шо вертає шоб вивести submit дані а не лише id
      `${this.assignmentsApiUrl}/assignmentId/submit/${submitId}`
    );
  }
}
