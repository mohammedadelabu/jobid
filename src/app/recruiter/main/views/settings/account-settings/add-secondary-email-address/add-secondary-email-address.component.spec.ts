import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSecondaryEmailAddressComponent } from './add-secondary-email-address.component';

describe('AddSecondaryEmailAddressComponent', () => {
  let component: AddSecondaryEmailAddressComponent;
  let fixture: ComponentFixture<AddSecondaryEmailAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSecondaryEmailAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSecondaryEmailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
