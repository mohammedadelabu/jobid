import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneEmailVerificationComponent } from './phone-email-verification.component';

describe('PhoneEmailVerificationComponent', () => {
  let component: PhoneEmailVerificationComponent;
  let fixture: ComponentFixture<PhoneEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneEmailVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
