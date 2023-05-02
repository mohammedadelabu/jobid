import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminCandidateSummaryComponent } from './update-admin-candidate-summary.component';

describe('UpdateAdminCandidateSummaryComponent', () => {
  let component: UpdateAdminCandidateSummaryComponent;
  let fixture: ComponentFixture<UpdateAdminCandidateSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAdminCandidateSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAdminCandidateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
