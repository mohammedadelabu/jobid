import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetJobApplicantsComponent } from './get-job-applicants.component';

describe('GetJobApplicantsComponent', () => {
  let component: GetJobApplicantsComponent;
  let fixture: ComponentFixture<GetJobApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetJobApplicantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetJobApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
