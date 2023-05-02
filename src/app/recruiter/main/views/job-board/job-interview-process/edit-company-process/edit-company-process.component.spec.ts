import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyProcessComponent } from './edit-company-process.component';

describe('EditCompanyProcessComponent', () => {
  let component: EditCompanyProcessComponent;
  let fixture: ComponentFixture<EditCompanyProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompanyProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
