import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfEmployeesFormComponent } from './number-of-employees-form.component';

describe('NumberOfEmployeesFormComponent', () => {
  let component: NumberOfEmployeesFormComponent;
  let fixture: ComponentFixture<NumberOfEmployeesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberOfEmployeesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfEmployeesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
