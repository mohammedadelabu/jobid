import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterviewQuestionComponent } from './add-interview-question.component';

describe('AddInterviewQuestionComponent', () => {
  let component: AddInterviewQuestionComponent;
  let fixture: ComponentFixture<AddInterviewQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInterviewQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterviewQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
