import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingCompanyConversionComponent } from './existing-company-conversion.component';

describe('ExistingCompanyConversionComponent', () => {
  let component: ExistingCompanyConversionComponent;
  let fixture: ComponentFixture<ExistingCompanyConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingCompanyConversionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingCompanyConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
