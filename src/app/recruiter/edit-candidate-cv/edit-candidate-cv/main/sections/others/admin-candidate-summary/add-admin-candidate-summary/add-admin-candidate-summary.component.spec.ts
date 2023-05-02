import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminCandidateSummaryComponent } from './add-admin-candidate-summary.component';

describe('AddAdminCandidateSummaryComponent', () => {
  let component: AddAdminCandidateSummaryComponent;
  let fixture: ComponentFixture<AddAdminCandidateSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminCandidateSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminCandidateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
