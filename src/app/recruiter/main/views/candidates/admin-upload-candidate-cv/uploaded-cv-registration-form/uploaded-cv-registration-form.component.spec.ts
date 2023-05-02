import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedCvRegistrationFormComponent } from './uploaded-cv-registration-form.component';

describe('UploadedCvRegistrationFormComponent', () => {
  let component: UploadedCvRegistrationFormComponent;
  let fixture: ComponentFixture<UploadedCvRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedCvRegistrationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedCvRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
