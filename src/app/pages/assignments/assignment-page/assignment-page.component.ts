import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../../../services/assignmentService';
import { AssignmentNavComponent } from '../../../components/assignment-nav/assignment-nav.component';
import { Assignment } from '../../../../shared/models/assignment';

@Component({
  selector: 'app-assignment-page',
  imports: [AssignmentNavComponent, NgFor],
  templateUrl: './assignment-page.component.html',
  styleUrl: './assignment-page.component.css',
})
export class AssignmentPageComponent implements OnInit {
  assignmentId!: number;
  assignment!: Assignment;
  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.assignmentId = params['assignmentId'];
      this.assignment = this.getAssignment(this.assignmentId);
    });
  }

  getAssignment(assignmentId: number): Assignment {
    return this.assignmentService.getAssignment(assignmentId);
  }
}
