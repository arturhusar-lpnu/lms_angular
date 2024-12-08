import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-submit-modal',
  imports: [FormsModule, CommonModule, NgIf],
  templateUrl: './submit-modal.component.html',
  styleUrls: ['./submit-modal.component.css'],
})
export class SubmitModalComponent {
  @Input() show: boolean = false;
  @Output() submit = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();
  codeInput: string = '';

  onSubmit() {
    this.submit.emit(this.codeInput);
  }

  onCancel() {
    this.cancel.emit();
  }
}
