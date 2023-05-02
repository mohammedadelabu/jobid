import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVacancyHistoryComponent } from './company-vacancy-history.component';

describe('CompanyVacancyHistoryComponent', () => {
  let component: CompanyVacancyHistoryComponent;
  let fixture: ComponentFixture<CompanyVacancyHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyVacancyHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyVacancyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
