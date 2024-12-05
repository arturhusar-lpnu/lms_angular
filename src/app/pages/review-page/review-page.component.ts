import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../../services/assignmentService';
import { AssignmentNavComponent } from '../../components/assignment-nav/assignment-nav.component';
import { Review } from '../../../shared/models/review';
@Component({
  selector: 'app-review-page',
  imports: [AssignmentNavComponent],
  templateUrl: './review-page.component.html',
  styleUrl: './review-page.component.css',
})
export class ReviewPageComponent implements OnInit {
  review!: Review;
  assignmentId!: number;
  submitId!: number;
  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.assignmentId = params['assignmentId'];
      this.submitId = params['submitId'];
      this.review = this.getReview();
    });
  }

  getReview() {
    return this.assignmentService.getReview(this.assignmentId, this.submitId);
  }
}
