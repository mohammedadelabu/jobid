import { TestBed } from '@angular/core/testing';

import { SidenavMessengerService } from './sidenav-messenger.service';

describe('SidenavMessengerService', () => {
  let service: SidenavMessengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavMessengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
