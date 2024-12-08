import { Component, OnInit } from '@angular/core';
import { Submit } from '../../../shared/models/submit';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../../services/assignmentService';
import { AssignmentNavComponent } from '../../components/assignment-nav/assignment-nav.component';
import { SubmitModalComponent } from '../../components/submit-modal/submit-modal.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-submit-page',
  imports: [AssignmentNavComponent, SubmitModalComponent, DatePipe],
  templateUrl: './submit-page.component.html',
  styleUrl: './submit-page.component.css',
})
export class SubmitPageComponent implements OnInit {
  submitId!: number;
  assignmentId!: number;
  submit!: Submit;
  showSubmitModal: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.assignmentId = params['assignmentId'];
      this.submitId = params['submitId'];
      this.submit = this.assignmentService.getSubmit(this.assignmentId);
    });
  }

  submitAgain() {
    this.openSubmitModal();
  }

  openSubmitModal() {
    this.showSubmitModal = true;
  }

  handleSubmit(code: string) {
    console.log('Code submitted:', code);
    this.showSubmitModal = false; // Close the modal
  }

  handleCancel() {
    console.log('Submission cancelled');
    this.showSubmitModal = false; // Close the modal
  }

  revertSubmission() {
    console.log('Revert submission clicked!');
    // Logic for reverting submission
  }
}
