import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InstructorService } from './instructorService';
import { UserData } from '../../shared/models/userData';
import { Observable } from 'rxjs';
import { Course } from '../../shared/models/course';
import { Student } from '../../shared/models/student';
import { Assignment } from '../../shared/models/assignment';
import { CodeConventionRule } from '../../shared/models/coderule';
import { Submit } from '../../shared/models/submit';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminApiUrl = 'https://localhost:7194//api/administration/';
  private courseApitUrl = 'https://localhost:7194/api/courses';
  constructor(
    private http: HttpClient,
    private instructorService: InstructorService
  ) {}

  getUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${this.adminApiUrl}/users`);
  }

  expellStudent(studentId: number) {
    return this.http.put(
      `${this.adminApiUrl}/expell-student/${studentId}`,
      null
    );
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.adminApiUrl}/students`);
  }

  getAllAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.adminApiUrl}/assignments`);
  }

  addRuleToAssignment(assignmentId: number, newRule: CodeConventionRule) {
    return this.http.post(
      `${this.adminApiUrl}/assignment/${assignmentId}/add-new-rule/`,
      newRule
    );
  }

  getAdminCourses(): Observable<any> {
    return this.http.get<Course>(this.courseApitUrl);
  }

  getAdminAssignments(): Observable<Assignment[]> {
    //const course = this.courseService.getSelectedCourse();
    return this.instructorService.getAssignments(0);
  }

  addAdminAssignment(assignment: Assignment): Observable<any> {
    return this.instructorService.addAssignment(assignment);
  }

  editAdminAssignment(assignment: Assignment): Observable<any> {
    return this.instructorService.editAssignment(assignment);
  }

  getAdminSubmitReview(
    assignment: Assignment,
    submit: Submit
  ): Observable<any> {
    return this.instructorService.getSubmitReview(assignment, submit);
  }
}
