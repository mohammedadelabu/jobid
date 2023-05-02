import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewRecruiterOpinionComponent } from './preview-recruiter-opinion.component';

describe('PreviewRecruiterOpinionComponent', () => {
  let component: PreviewRecruiterOpinionComponent;
  let fixture: ComponentFixture<PreviewRecruiterOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewRecruiterOpinionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewRecruiterOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
