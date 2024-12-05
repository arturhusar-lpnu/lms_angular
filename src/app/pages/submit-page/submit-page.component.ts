import { Component, OnInit } from '@angular/core';
import { Submit } from '../../../shared/models/submit';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../../services/assignmentService';
import { AssignmentNavComponent } from '../../components/assignment-nav/assignment-nav.component';

@Component({
  selector: 'app-submit-page',
  imports: [AssignmentNavComponent],
  templateUrl: './submit-page.component.html',
  styleUrl: './submit-page.component.css',
})
export class SubmitPageComponent implements OnInit {
  submitId!: number;
  assignmentId!: number;
  submit!: Submit;

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
}
