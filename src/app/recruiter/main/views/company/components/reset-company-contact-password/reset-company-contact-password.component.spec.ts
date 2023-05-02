import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetCompanyContactPasswordComponent } from './reset-company-contact-password.component';

describe('ResetCompanyContactPasswordComponent', () => {
  let component: ResetCompanyContactPasswordComponent;
  let fixture: ComponentFixture<ResetCompanyContactPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetCompanyContactPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetCompanyContactPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
