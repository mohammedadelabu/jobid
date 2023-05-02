import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyConversionComponent } from './new-company-conversion.component';

describe('NewCompanyConversionComponent', () => {
  let component: NewCompanyConversionComponent;
  let fixture: ComponentFixture<NewCompanyConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCompanyConversionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanyConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
