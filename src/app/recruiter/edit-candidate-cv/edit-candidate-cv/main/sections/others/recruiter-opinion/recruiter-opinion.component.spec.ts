import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterOpinionComponent } from './recruiter-opinion.component';

describe('RecruiterOpinionComponent', () => {
  let component: RecruiterOpinionComponent;
  let fixture: ComponentFixture<RecruiterOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterOpinionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
