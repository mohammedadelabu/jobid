import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDownloadOptionsComponent } from './job-download-options.component';

describe('JobDownloadOptionsComponent', () => {
  let component: JobDownloadOptionsComponent;
  let fixture: ComponentFixture<JobDownloadOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDownloadOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDownloadOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
