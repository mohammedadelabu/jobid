import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterModuleFormComponent } from './register-module-form.component';

describe('RegisterModuleFormComponent', () => {
  let component: RegisterModuleFormComponent;
  let fixture: ComponentFixture<RegisterModuleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterModuleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterModuleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
