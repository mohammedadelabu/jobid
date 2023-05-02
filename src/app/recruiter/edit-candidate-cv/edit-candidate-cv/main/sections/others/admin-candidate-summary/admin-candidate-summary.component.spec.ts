import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCandidateSummaryComponent } from './admin-candidate-summary.component';

describe('AdminCandidateSummaryComponent', () => {
  let component: AdminCandidateSummaryComponent;
  let fixture: ComponentFixture<AdminCandidateSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCandidateSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCandidateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
