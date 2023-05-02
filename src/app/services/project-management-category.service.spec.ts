import { TestBed } from '@angular/core/testing';

import { ProjectManagementCategoryService } from './project-management-category.service';

describe('ProjectManagementCategoryService', () => {
  let service: ProjectManagementCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectManagementCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
