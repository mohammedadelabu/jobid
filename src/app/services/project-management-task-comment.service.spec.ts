import { TestBed } from '@angular/core/testing';

import { ProjectManagementTaskCommentService } from './project-management-task-comment.service';

describe('ProjectManagementTaskCommentService', () => {
  let service: ProjectManagementTaskCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectManagementTaskCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
