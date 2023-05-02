import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyContactComponent } from './add-company-contact.component';

describe('AddCompanyContactComponent', () => {
  let component: AddCompanyContactComponent;
  let fixture: ComponentFixture<AddCompanyContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompanyContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
