import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterScorecardComponent } from './recruiter-scorecard.component';

describe('RecruiterScorecardComponent', () => {
  let component: RecruiterScorecardComponent;
  let fixture: ComponentFixture<RecruiterScorecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterScorecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterScorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
