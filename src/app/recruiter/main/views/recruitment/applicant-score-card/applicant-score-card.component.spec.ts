import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantScoreCardComponent } from './applicant-score-card.component';

describe('ApplicantScoreCardComponent', () => {
  let component: ApplicantScoreCardComponent;
  let fixture: ComponentFixture<ApplicantScoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantScoreCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantScoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
