import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-assignment-box',
  imports: [],
  templateUrl: './assignment-box.component.html',
  styleUrl: './assignment-box.component.css',
})
export class AssignmentBoxComponent {
  @Input() assignmentName!: string;
  @Input() assignedTo!: string;
  @Input() dueDate!: Date;
  @Input() createdBy!: string;

  @Output() removeAssignment = new EventEmitter<void>();

  closeAssignment() {
    this.removeAssignment.emit();
  }
}
