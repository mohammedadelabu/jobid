import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUploadCandidateCvComponent } from './admin-upload-candidate-cv.component';

describe('AdminUploadCandidateCvComponent', () => {
  let component: AdminUploadCandidateCvComponent;
  let fixture: ComponentFixture<AdminUploadCandidateCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUploadCandidateCvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUploadCandidateCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
