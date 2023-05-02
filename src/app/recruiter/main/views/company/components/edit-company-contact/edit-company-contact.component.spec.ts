import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyContactComponent } from './edit-company-contact.component';

describe('EditCompanyContactComponent', () => {
  let component: EditCompanyContactComponent;
  let fixture: ComponentFixture<EditCompanyContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompanyContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
