import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecruiterOpinionComponent } from './update-recruiter-opinion.component';

describe('UpdateRecruiterOpinionComponent', () => {
  let component: UpdateRecruiterOpinionComponent;
  let fixture: ComponentFixture<UpdateRecruiterOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRecruiterOpinionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRecruiterOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
