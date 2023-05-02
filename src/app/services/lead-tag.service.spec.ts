import { TestBed } from '@angular/core/testing';

import { LeadTagService } from './lead-tag.service';

describe('LeadTagService', () => {
  let service: LeadTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
