import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAdminCandidateSummaryComponent } from './preview-admin-candidate-summary.component';

describe('PreviewAdminCandidateSummaryComponent', () => {
  let component: PreviewAdminCandidateSummaryComponent;
  let fixture: ComponentFixture<PreviewAdminCandidateSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewAdminCandidateSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAdminCandidateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
