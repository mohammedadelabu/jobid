import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantLocationComponent } from './applicant-location.component';

describe('ApplicantLocationComponent', () => {
  let component: ApplicantLocationComponent;
  let fixture: ComponentFixture<ApplicantLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
