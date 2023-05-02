import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCompanyContactComponent } from './get-company-contact.component';

describe('GetCompanyContactComponent', () => {
  let component: GetCompanyContactComponent;
  let fixture: ComponentFixture<GetCompanyContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetCompanyContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCompanyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
