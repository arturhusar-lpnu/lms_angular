import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../services/authService';
import { AdminService } from '../../../services/adminService';
import { InstructorService } from '../../../services/instructorService';
import { StudentService } from '../../../services/studentSevice';
import { Assignment } from '../../../../shared/models/assignment';
import { AssignmentBoxComponent } from '../../../components/assignment-box/assignment-box.component';

@Component({
  selector: 'app-assignments-page',
  imports: [CommonModule, NgFor, RouterLink, AssignmentBoxComponent],
  templateUrl: './assignments-page.component.html',
  styleUrl: './assignments-page.component.css',
})
export class AssignmentsPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private adminService: AdminService,
    private instructorService: InstructorService,
    private studentService: StudentService
  ) {}

  public assignments$: Observable<Assignment[]> = null!;

  ngOnInit() {
    this.assignments$ = this.getAssignments();
  }

  getAssignments(): Observable<Assignment[]> {
    const role = this.authService.getUserRole();
    if (role === 'Student') {
      return this.studentService.getAssignments();
    } else {
      return this.instructorService.getAssignments();
    }
  }

  addAssignment(assignment: Assignment) {
    const role = this.authService.getUserRole();
    if (role === 'Student') {
      return;
    }
    this.instructorService
      .addAssignment(assignment)
      .pipe(
        tap(() => {
          this.assignments$ = this.getAssignments();
        })
      )
      .subscribe();
  }

  removeAssignment(assignmentId: number) {
    const role = this.authService.getUserRole();
    if (role === 'Student') {
      return;
    }
    this.instructorService
      .removeAssignment(assignmentId)
      .pipe(
        tap(() => {
          this.assignments$ = this.getAssignments();
        })
      )
      .subscribe();
  }
}
