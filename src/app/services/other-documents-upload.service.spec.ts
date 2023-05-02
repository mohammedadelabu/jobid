import { TestBed } from '@angular/core/testing';

import { OtherDocumentsUploadService } from './other-documents-upload.service';

describe('OtherDocumentsUploadService', () => {
  let service: OtherDocumentsUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherDocumentsUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
