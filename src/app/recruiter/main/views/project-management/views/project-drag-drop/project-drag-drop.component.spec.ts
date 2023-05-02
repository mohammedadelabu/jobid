import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDragDropComponent } from './project-drag-drop.component';

describe('ProjectDragDropComponent', () => {
  let component: ProjectDragDropComponent;
  let fixture: ComponentFixture<ProjectDragDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDragDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
