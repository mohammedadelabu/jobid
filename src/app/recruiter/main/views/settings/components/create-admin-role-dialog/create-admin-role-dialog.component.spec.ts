import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminRoleDialogComponent } from './create-admin-role-dialog.component';

describe('CreateAdminRoleDialogComponent', () => {
  let component: CreateAdminRoleDialogComponent;
  let fixture: ComponentFixture<CreateAdminRoleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdminRoleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdminRoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
