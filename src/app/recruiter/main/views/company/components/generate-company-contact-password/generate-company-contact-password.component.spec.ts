import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCompanyContactPasswordComponent } from './generate-company-contact-password.component';

describe('GenerateCompanyContactPasswordComponent', () => {
  let component: GenerateCompanyContactPasswordComponent;
  let fixture: ComponentFixture<GenerateCompanyContactPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateCompanyContactPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCompanyContactPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
