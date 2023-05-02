import { TestBed } from '@angular/core/testing';

import { ProjectManagementTaskService } from './project-management-task.service';

describe('ProjectManagementTaskService', () => {
  let service: ProjectManagementTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectManagementTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
