import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreateTaskComponent } from './project-create-task.component';

describe('ProjectCreateTaskComponent', () => {
  let component: ProjectCreateTaskComponent;
  let fixture: ComponentFixture<ProjectCreateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCreateTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
