import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionDeniedPageComponent } from './permission-denied-page.component';

describe('PermissionDeniedPageComponent', () => {
  let component: PermissionDeniedPageComponent;
  let fixture: ComponentFixture<PermissionDeniedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionDeniedPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionDeniedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
