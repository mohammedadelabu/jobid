import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyProcessComponent } from './add-company-process.component';

describe('AddCompanyProcessComponent', () => {
  let component: AddCompanyProcessComponent;
  let fixture: ComponentFixture<AddCompanyProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompanyProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
