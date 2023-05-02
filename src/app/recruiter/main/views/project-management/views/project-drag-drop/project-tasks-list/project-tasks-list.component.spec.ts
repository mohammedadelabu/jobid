import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTasksListComponent } from './project-tasks-list.component';

describe('ProjectTasksListComponent', () => {
  let component: ProjectTasksListComponent;
  let fixture: ComponentFixture<ProjectTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTasksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
