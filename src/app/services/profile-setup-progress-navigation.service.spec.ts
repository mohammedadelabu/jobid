import { TestBed } from '@angular/core/testing';

import { ProfileSetupProgressNavigationService } from './profile-setup-progress-navigation.service';

describe('ProfileSetupProgressNavigationService', () => {
  let service: ProfileSetupProgressNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileSetupProgressNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
