import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddCategoryComponent } from './project-add-category.component';

describe('ProjectAddCategoryComponent', () => {
  let component: ProjectAddCategoryComponent;
  let fixture: ComponentFixture<ProjectAddCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAddCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
