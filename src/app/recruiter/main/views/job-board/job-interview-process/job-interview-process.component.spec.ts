import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobInterviewProcessComponent } from './job-interview-process.component';

describe('JobInterviewProcessComponent', () => {
  let component: JobInterviewProcessComponent;
  let fixture: ComponentFixture<JobInterviewProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobInterviewProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobInterviewProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
