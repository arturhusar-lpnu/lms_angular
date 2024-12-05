import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentBoxComponent } from './assignment-box.component';

describe('AssignmentBoxComponent', () => {
  let component: AssignmentBoxComponent;
  let fixture: ComponentFixture<AssignmentBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
