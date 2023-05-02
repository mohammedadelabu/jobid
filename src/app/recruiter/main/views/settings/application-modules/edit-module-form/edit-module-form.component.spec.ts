import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModuleFormComponent } from './edit-module-form.component';

describe('EditModuleFormComponent', () => {
  let component: EditModuleFormComponent;
  let fixture: ComponentFixture<EditModuleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModuleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModuleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
