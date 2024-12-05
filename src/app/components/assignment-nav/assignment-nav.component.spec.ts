import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentNavComponent } from './assignment-nav.component';

describe('AssignmentNavComponent', () => {
  let component: AssignmentNavComponent;
  let fixture: ComponentFixture<AssignmentNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
