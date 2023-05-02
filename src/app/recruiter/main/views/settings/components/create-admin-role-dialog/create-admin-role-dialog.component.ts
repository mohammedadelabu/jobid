import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {
  AddRole,
  AdminRoleAndPermissionService
} from 'src/app/services/admin-role-and-permission.service';
import { IdentityService } from 'src/app/services/identity.service';
import { IAppState } from 'src/STORE/store';
import {
  ADD_ADMIN_ROLE,
  ADD_ADMIN_ROLE_ERROR,
  ADD_ADMIN_ROLE_SUCCESS,
} from 'src/STORE/_adminRoleAndPermission.store/adminRoleAndPermission.action';

@Component({
  selector: 'app-create-admin-role-dialog',
  templateUrl: './create-admin-role-dialog.component.html',
  styleUrls: ['./create-admin-role-dialog.component.scss'],
})
export class CreateAdminRoleDialogComponent implements OnInit {
  @select((s) => s.applicationModules.applicationModules)
  applicationModules$: any;
  @select((s) => s.applicationModules.isLoading) isLoading$: any;
  CreateAdminRoleForm!: FormGroup;
  model: any = {};
  applicationModules: any;
  isSending: boolean = false;
  constructor(
    private _identitySvc: IdentityService,
    private _fb: FormBuilder,
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService,
    public dialogRef: MatDialogRef<CreateAdminRoleDialogComponent>,
    private ngRedux: NgRedux<IAppState>,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.onGetUpdatedBy();
    this.getAdminRoles();
    this.getApplicationModules();
    this.buildForm();
  }

  buildForm() {
    this.CreateAdminRoleForm = this._fb.group({
      RoleName: ['', [Validators.required]],
      ModuleName: [[], [Validators.required]],
    });
  }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();

    return updatedBy;
  }

  getApplicationModules() {
    this.applicationModules$.subscribe((modules: any) => {
      if (modules) {
        this.applicationModules = modules;
        console.log('this.applicationModules: ', this.applicationModules);
      } else {
        this.applicationModules = [];
      }
    });
  }

  onSubmit() {
    const Payload: AddRole = {
      RoleName: this.CreateAdminRoleForm.value.RoleName,
      ModuleId: this.CreateAdminRoleForm.value.ModuleName,
    };

    let data = { ...Payload, CreatedAt: new Date() };
    this.isSending = true;
    this.ngRedux.dispatch({ type: ADD_ADMIN_ROLE });
    this._adminRoleAndPermissionSvc.AddRole(Payload).subscribe({
      next: (response: any) => {
        if (response) {
          if (response.ResponseCode == '200') {
            this._toastr.success('Admin role successfully created!');
          }
          this._toastr.success(response?.ResponseMessage);
          this.isSending = false;
          this.ngRedux.dispatch({
            type: ADD_ADMIN_ROLE_SUCCESS,
            payload: data,
          });
          this.model.RoleName = '';
          this.cancelDialog();
          this.getAdminRoles();
        }
      },
      error: (err: any) => {
        if (err) {
          this.isSending = false;
          this._toastr.error('Creating role failed, try again!');
          this.ngRedux.dispatch({ type: ADD_ADMIN_ROLE_ERROR, payload: err });
        }
      },
    });
  }

  getAdminRoles() {
    this._adminRoleAndPermissionSvc.LoadAdminRoleList();
  }
  cancelDialog() {
    this.dialogRef.close('Pizza!');
  }
}
