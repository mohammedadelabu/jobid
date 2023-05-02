import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAcademicProfessionalCertificateComponent } from './upload-academic-professional-certificate.component';

describe('UploadAcademicProfessionalCertificateComponent', () => {
  let component: UploadAcademicProfessionalCertificateComponent;
  let fixture: ComponentFixture<UploadAcademicProfessionalCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadAcademicProfessionalCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAcademicProfessionalCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
