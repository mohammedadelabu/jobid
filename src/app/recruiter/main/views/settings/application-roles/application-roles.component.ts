import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminRoleAndPermissionService } from 'src/app/services/admin-role-and-permission.service';
import { RoleAndPermissionService } from 'src/app/services/role-and-permission.service';
import { IAppState } from 'src/STORE/store';
import {
  REMOVE_ADMIN_ROLE,
  REMOVE_ADMIN_ROLE_ERROR,
  REMOVE_ADMIN_ROLE_SUCCESS,
} from 'src/STORE/_adminRoleAndPermission.store/adminRoleAndPermission.action';

@Component({
  selector: 'app-application-roles',
  templateUrl: './application-roles.component.html',
  styleUrls: ['./application-roles.component.scss'],
})
export class ApplicationRolesComponent implements OnInit {
  @select((s) => s.adminRoles.adminRoles)
  adminRoles$: any;
  @select((s) => s.adminRoles.isLoading) isLoading$: any;
  applicationModuleList: any[] = [];
  isRegisterModule: boolean = false;
  errorMessage: any;
  isEditModule: boolean = false;
  moduleData: any;
  roleList: any;
  constructor(
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService,
    private ngRedux: NgRedux<IAppState>,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // this.getRoleModuleList();
    this.getAdminRoles();
  }

  getRoleModuleList() {
    this._adminRoleAndPermissionSvc.LoadModuleList();
    this._adminRoleAndPermissionSvc.GetRoleModuleList().subscribe({
      next: (response: any) => {
        if (response) {
          
          this.applicationModuleList = response?.Data;
        }
      },
      error: (err: any) => {
        if (err) {
          
        }
      },
    });
  }

  getAdminRoles() {
    this._adminRoleAndPermissionSvc.LoadAdminRoleList();
    this.adminRoles$.subscribe({
      next: (list: any) => {
        console.log('list: ', list);
        this.roleList = list;
      },
      error: (err: any) => {
        
      },
    });
  }
  onView(item: any){
    
    let x = JSON.stringify(item)
    this._router.navigate(['/recruiter/settings/roles', item?.Id])
    // this._router.navigate(['/recruiter/settings/roles', x])
  }
  onRemove(item: any) {
    this.ngRedux.dispatch({ type: REMOVE_ADMIN_ROLE });
    
    const ModuleId = item?.Id;
    this._adminRoleAndPermissionSvc.DeleteRole(ModuleId).subscribe({
      next: (response: any) => {
        if (response) {
          
          this.ngRedux.dispatch({
            type: REMOVE_ADMIN_ROLE_SUCCESS,
            payload: ModuleId,
          });
        }
      },
      error: (err: any) => {
        if (err) {
          
          this.ngRedux.dispatch({
            type: REMOVE_ADMIN_ROLE_ERROR,
            payload: err,
          });
          this.errorMessage = err.error.ResponseMessage;
          setTimeout(() => {
            this.errorMessage = '';
          }, 2500);
        }
      },
    });
  }

  onEdit(item: any) {
    
    this.moduleData = item;
    this.isEditModule = true;
  }

  onCloseAddModuleForm($event: any) {
    this.isRegisterModule = $event;
  }
  onCloseEditModuleForm($event: any) {
    this.isEditModule = $event;
  }
}
