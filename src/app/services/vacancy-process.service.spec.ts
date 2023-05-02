import { TestBed } from '@angular/core/testing';

import { VacancyProcessService } from './vacancy-process.service';

describe('VacancyProcessService', () => {
  let service: VacancyProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacancyProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
