import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateApplicationHistoryComponent } from './candidate-application-history.component';

describe('CandidateApplicationHistoryComponent', () => {
  let component: CandidateApplicationHistoryComponent;
  let fixture: ComponentFixture<CandidateApplicationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateApplicationHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateApplicationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
