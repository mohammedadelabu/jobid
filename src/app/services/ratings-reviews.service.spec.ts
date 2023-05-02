import { TestBed } from '@angular/core/testing';

import { RatingsReviewsService } from './ratings-reviews.service';

describe('RatingsReviewsService', () => {
  let service: RatingsReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingsReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
