import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteCandidateFormComponent } from './invite-candidate-form.component';

describe('InviteCandidateFormComponent', () => {
  let component: InviteCandidateFormComponent;
  let fixture: ComponentFixture<InviteCandidateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteCandidateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteCandidateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
