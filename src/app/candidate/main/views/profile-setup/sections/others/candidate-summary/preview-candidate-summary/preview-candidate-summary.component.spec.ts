import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCandidateSummaryComponent } from './preview-candidate-summary.component';

describe('PreviewCandidateSummaryComponent', () => {
  let component: PreviewCandidateSummaryComponent;
  let fixture: ComponentFixture<PreviewCandidateSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewCandidateSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewCandidateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
