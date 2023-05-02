import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecruiterOpinionComponent } from './add-recruiter-opinion.component';

describe('AddRecruiterOpinionComponent', () => {
  let component: AddRecruiterOpinionComponent;
  let fixture: ComponentFixture<AddRecruiterOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecruiterOpinionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecruiterOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
