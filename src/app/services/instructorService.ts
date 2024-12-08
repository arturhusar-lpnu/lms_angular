import { Injectable } from '@angular/core';
import { AuthService } from './authService';
import { LoginService } from './loginService';
import { HttpClient } from '@angular/common/http';
import { Instructor } from '../../shared/models/instructor';
import { Course } from '../../shared/models/course';
import { AssignmentMapService } from './assignmentMapService';
import { Assignment } from '../../shared/models/assignment';
import { CourseResponse } from './studentSevice';
import { Submit } from '../../shared/models/submit';
import { Observable, map } from 'rxjs';

export interface AssignmentResponse {
  assignments: Assignment[];
}

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private assignmentsApiUrl =
    'https://localhost:7194/api/instructor-assignments';
  private coursesApiUrl = 'https://localhost:7194/api/instructor-courses';
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private assignmentMapService: AssignmentMapService
  ) {}

  getCourses(): any {
    const id = this.authService.getUserId();
    return this.http.get<Course[]>(
      `${this.coursesApiUrl}/instructor/${id}/courses`
    );
  }
  getAssignment(assignmentId: number): Observable<Assignment> {
    return this.http.get<Assignment>(
      `${this.assignmentsApiUrl}/assignment/${assignmentId}`
    );
  }

  getAssignments(courseId: number): any {
    return this.http
      .get<any[]>(`${this.assignmentsApiUrl}/course/${courseId}`)
      .pipe(
        map((apiData) => {
          return apiData.map((assignmentData) =>
            this.assignmentMapService.mapAssignment(assignmentData)
          );
        })
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
