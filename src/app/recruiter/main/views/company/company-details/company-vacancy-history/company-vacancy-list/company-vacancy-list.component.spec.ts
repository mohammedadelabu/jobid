import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVacancyListComponent } from './company-vacancy-list.component';

describe('CompanyVacancyListComponent', () => {
  let component: CompanyVacancyListComponent;
  let fixture: ComponentFixture<CompanyVacancyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyVacancyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyVacancyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
