import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCommentTaskComponent } from './project-comment-task.component';

describe('ProjectCommentTaskComponent', () => {
  let component: ProjectCommentTaskComponent;
  let fixture: ComponentFixture<ProjectCommentTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCommentTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCommentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
