import { Injectable } from '@angular/core';
import { AuthService } from './authService';
import { StudentService } from './studentSevice';
import { InstructorService } from './instructorService';
import { Review } from '../../shared/models/review';
import { Assignment } from '../../shared/models/assignment';
import { Submit } from '../../shared/models/submit';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  assignment!: Assignment;
  submission!: Submit;
  review!: Review;
  isSubmitted = false;

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private instructorService: InstructorService
  ) {}

  getAssignment(assignmentId: number): Assignment {
    const userRole = this.getUserRole();
    if (userRole === 'Student') {
      this.studentService
        .getAssignment(assignmentId)
        .subscribe((assignment: Assignment) => {
          this.assignment = assignment;
          //this.isSubmitted = this.submission !== null;
        });
    } else {
      this.instructorService
        .getAssignment(assignmentId)
        .subscribe((assignment: Assignment) => {
          this.assignment = assignment;
          //this.isSubmitted = this.submission !== null;
        });
    }
    return this.assignment;
  }

  getSubmit(assignmentId: number): Submit {
    const userRole = this.getUserRole();
    if (userRole === 'Student') {
      this.studentService
        .getSubmit(assignmentId)
        .subscribe((submit: Submit) => {
          this.submission = submit;
        });
    }
    return this.submission;
  } // write one for instructor 2 and all of them

  getReview(assignmentId: number, submitId: number): Review {
    const userRole = this.getUserRole();
    if (userRole === 'Student') {
      this.studentService
        .getReview(assignmentId, submitId)
        .subscribe((review: Review) => {
          this.review = review;
        });
    }
    return this.review;
  } // write one for instructor 2 and all of them

  submitAssignment(assignmentId: number, submit: Submit) {
    return this.studentService.submitAssignment(assignmentId, submit).pipe(
      tap(() => {
        this.isSubmitted = true;
      })
    );
  }

  revertAssignment(assignmentId: number, submitId: number) {
    return this.studentService.revertSubmit(assignmentId, submitId).pipe(
      tap(() => {
        this.isSubmitted = false;
      })
    );
  }

  getUserRole() {
    return this.authService.getUserRole();
  }
}
