import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../../../services/assignmentService';
import { AssignmentNavComponent } from '../../../components/assignment-nav/assignment-nav.component';
import { Assignment } from '../../../../shared/models/assignment';
import { SubmitModalComponent } from '../../../components/submit-modal/submit-modal.component';
import { Submit } from '../../../../shared/models/submit';

@Component({
  selector: 'app-assignment-page',
  imports: [
    AssignmentNavComponent,
    NgFor,
    NgIf,
    CommonModule,
    SubmitModalComponent,
  ],
  templateUrl: './assignment-page.component.html',
  styleUrl: './assignment-page.component.css',
})
export class AssignmentPageComponent implements OnInit {
  assignmentId!: number;
  assignment!: Assignment;
  showSubmitModal: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.assignmentId = params['assignmentId'];
      console.log(this.assignmentId);
      console.log(this.getAssignment(this.assignmentId));
      this.assignment = this.getAssignment(this.assignmentId);
      console.log(this.assignment);
    });
  }

  getAssignment(assignmentId: number): Assignment {
    console.log(this.assignmentService.getAssignment(assignmentId));
    return this.assignmentService.getAssignment(assignmentId);
  }

  openSubmitModal() {
    this.showSubmitModal = true;
  }

  handleSubmit(code: string) {
    console.log('Code submitted:', code);
    const id = this.assignmentService.getSubmit(this.assignmentId).id;
    const newSubmit: Submit = new Submit(id, code, new Date().toString());
    this.assignmentService.submitAssignment(this.assignmentId, newSubmit);
    this.showSubmitModal = false; // Close the modal
  }

  closeSubmitModal() {
    console.log('Submission cancelled');
    this.showSubmitModal = false; // Close the modal
  }

  isSubmitted() {
    return this.assignmentService.isSubmitted;
  }
}
