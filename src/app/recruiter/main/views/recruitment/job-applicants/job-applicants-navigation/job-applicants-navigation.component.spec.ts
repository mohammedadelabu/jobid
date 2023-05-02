import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicantsNavigationComponent } from './job-applicants-navigation.component';

describe('JobApplicantsNavigationComponent', () => {
  let component: JobApplicantsNavigationComponent;
  let fixture: ComponentFixture<JobApplicantsNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicantsNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicantsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
