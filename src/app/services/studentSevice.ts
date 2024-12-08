import { Injectable } from '@angular/core';
import { AuthService } from './authService';
import { HttpClient } from '@angular/common/http';
import { Submit } from '../../shared/models/submit';
import { Course } from '../../shared/models/course';
import { Review } from '../../shared/models/review';
import { Assignment } from '../../shared/models/assignment';
import { Observable, tap, map } from 'rxjs';
import { AssignmentMapService } from './assignmentMapService';

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
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private assignmentMapService: AssignmentMapService
  ) {}

  getCourses(): any {
    const id = this.authService.getUserId();
    return this.http.get(`${this.coursesApiUrl}/student/${id}`);
  }

  getAssignment(assignmentId: number): Observable<Assignment> {
    return this.http
      .get<any>(`${this.assignmentsApiUrl}/assignment/${assignmentId}`)
      .pipe(
        map((apiData) => {
          console.log('GET ASSIGNMENT 111');
          console.log(this.assignmentMapService.mapAssignment(apiData));
          return this.assignmentMapService.mapAssignment(apiData);
        })
      );
  }

  getAssignments(): any {
    const studentId = this.authService.getUserId();
    return this.http
      .get<any[]>(`${this.assignmentsApiUrl}/assignments/student/${studentId}`)
      .pipe(
        map((apiData) => {
          return apiData.map((assignmentData) => {
            console.log(
              this.assignmentMapService.mapAssignment(assignmentData)
            );
            return this.assignmentMapService.mapAssignment(assignmentData);
          });
        })
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
    return this.http.get<Review>(
      `${this.assignmentsApiUrl}/assignment/${assignmentId}/submit/${submitId}/review`
    );
  }
  getSubmit(assignmentId: number): any {
    return this.http.get<Submit>( // додумати шо вертає шоб вивести submit дані а не лише id
      `${this.assignmentsApiUrl}/assignment/${assignmentId}/submit`
    );
  }
}
