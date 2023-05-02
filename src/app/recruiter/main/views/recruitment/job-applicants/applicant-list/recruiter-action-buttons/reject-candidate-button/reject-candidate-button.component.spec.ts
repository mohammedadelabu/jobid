import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectCandidateButtonComponent } from './reject-candidate-button.component';

describe('RejectCandidateButtonComponent', () => {
  let component: RejectCandidateButtonComponent;
  let fixture: ComponentFixture<RejectCandidateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectCandidateButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectCandidateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
