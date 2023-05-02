import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResumePreviewComponent } from './admin-resume-preview.component';

describe('AdminResumePreviewComponent', () => {
  let component: AdminResumePreviewComponent;
  let fixture: ComponentFixture<AdminResumePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminResumePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminResumePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
