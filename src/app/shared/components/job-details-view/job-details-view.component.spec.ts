import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsViewComponent } from './job-details-view.component';

describe('JobDetailsViewComponent', () => {
  let component: JobDetailsViewComponent;
  let fixture: ComponentFixture<JobDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDetailsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
