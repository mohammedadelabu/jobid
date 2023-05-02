import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCandidateSummaryComponent } from './add-candidate-summary.component';

describe('AddCandidateSummaryComponent', () => {
  let component: AddCandidateSummaryComponent;
  let fixture: ComponentFixture<AddCandidateSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCandidateSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCandidateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
