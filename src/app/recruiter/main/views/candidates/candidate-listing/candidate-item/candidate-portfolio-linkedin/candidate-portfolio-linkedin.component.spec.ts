import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatePortfolioLinkedinComponent } from './candidate-portfolio-linkedin.component';

describe('CandidatePortfolioLinkedinComponent', () => {
  let component: CandidatePortfolioLinkedinComponent;
  let fixture: ComponentFixture<CandidatePortfolioLinkedinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatePortfolioLinkedinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatePortfolioLinkedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
