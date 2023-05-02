import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyContactComponentDialog } from './add-company-contact.component';

describe('AddCompanyContactComponentDialog', () => {
  let component: AddCompanyContactComponentDialog;
  let fixture: ComponentFixture<AddCompanyContactComponentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompanyContactComponentDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyContactComponentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
