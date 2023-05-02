import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditTaskComponent } from './project-edit-task.component';

describe('ProjectEditTaskComponent', () => {
  let component: ProjectEditTaskComponent;
  let fixture: ComponentFixture<ProjectEditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectEditTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
