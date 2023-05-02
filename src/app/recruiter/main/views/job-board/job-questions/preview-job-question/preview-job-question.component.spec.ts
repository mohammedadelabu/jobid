import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewJobQuestionComponent } from './preview-job-question.component';

describe('PreviewJobQuestionComponent', () => {
  let component: PreviewJobQuestionComponent;
  let fixture: ComponentFixture<PreviewJobQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewJobQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewJobQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
