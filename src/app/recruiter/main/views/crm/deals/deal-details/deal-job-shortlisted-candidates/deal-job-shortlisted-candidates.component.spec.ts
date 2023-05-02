import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealJobShortlistedCandidatesComponent } from './deal-job-shortlisted-candidates.component';

describe('DealJobShortlistedCandidatesComponent', () => {
  let component: DealJobShortlistedCandidatesComponent;
  let fixture: ComponentFixture<DealJobShortlistedCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealJobShortlistedCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealJobShortlistedCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
