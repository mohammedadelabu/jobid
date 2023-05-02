import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditCategoryComponent } from './project-edit-category.component';

describe('ProjectEditCategoryComponent', () => {
  let component: ProjectEditCategoryComponent;
  let fixture: ComponentFixture<ProjectEditCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectEditCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
