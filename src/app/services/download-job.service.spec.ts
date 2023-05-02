import { TestBed } from '@angular/core/testing';

import { DownloadJobService } from './download-job.service';

describe('DownloadJobService', () => {
  let service: DownloadJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
