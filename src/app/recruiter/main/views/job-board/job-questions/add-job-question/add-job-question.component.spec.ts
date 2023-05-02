import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobQuestionComponent } from './add-job-question.component';

describe('AddJobQuestionComponent', () => {
  let component: AddJobQuestionComponent;
  let fixture: ComponentFixture<AddJobQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJobQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
