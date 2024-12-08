import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AssignmentService } from '../../services/assignmentService';
@Component({
  selector: 'app-assignment-nav',
  imports: [NgIf],
  templateUrl: './assignment-nav.component.html',
  styleUrl: './assignment-nav.component.css',
})
export class AssignmentNavComponent {
  @Input() assignmentId!: number;
  constructor(
    private assignmentService: AssignmentService,
    private router: Router
  ) {}
  navigateToAssignment() {
    console.log(this.assignmentId);
    const assignment = this.assignmentService.getAssignment(this.assignmentId);
    console.log(assignment);
    this.router.navigate(['/assignments', assignment.id]);
  }
  navigateToSubmit() {
    const submit = this.assignmentService.getSubmit(this.assignmentId);
    console.log(submit);
    this.router.navigate([
      '/assignments',
      this.assignmentId,
      'submit',
      submit.id,
    ]);
  }
  navigateToReview() {
    const submit = this.assignmentService.getSubmit(this.assignmentId);
    this.router.navigate([
      '/assignments',
      this.assignmentId,
      'submit',
      submit.id,
      'review',
    ]);
  }

  isSubmitted() {
    return this.assignmentService.isSubmitted;
  }
}
