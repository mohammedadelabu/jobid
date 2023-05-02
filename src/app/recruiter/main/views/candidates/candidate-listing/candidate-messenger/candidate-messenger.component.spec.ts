import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateMessengerComponent } from './candidate-messenger.component';

describe('CandidateMessengerComponent', () => {
  let component: CandidateMessengerComponent;
  let fixture: ComponentFixture<CandidateMessengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateMessengerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
