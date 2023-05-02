import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCandidateSummaryComponent } from './update-candidate-summary.component';

describe('UpdateCandidateSummaryComponent', () => {
  let component: UpdateCandidateSummaryComponent;
  let fixture: ComponentFixture<UpdateCandidateSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCandidateSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCandidateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
