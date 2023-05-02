import { NgRedux, select } from '@angular-redux/store';
import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AdminRoleAndPermissionService,
  UpdatePermission,
  UpdateRoleModule,
} from 'src/app/services/admin-role-and-permission.service';
import { RoleAndPermissionService } from 'src/app/services/role-and-permission.service';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_ADMIN_ROLE_DETAILS,
  FETCH_ADMIN_ROLE_DETAILS_ERROR,
  FETCH_ADMIN_ROLE_DETAILS_SUCCESS,
} from 'src/STORE/_adminRoleAndPermission.store/adminRoleAndPermission.action';

@Component({
  selector: 'app-module-permissions',
  templateUrl: './module-permissions.component.html',
  styleUrls: ['./module-permissions.component.scss'],
})
export class ModulePermissionsComponent implements OnInit {
  @select((s) => s.adminRoles.adminRoles)
  adminRoles$: any;
  @select((s) => s.adminRoles.isLoading)
  isLoading$: any;
  @select((s) => s.adminRoles.adminRoleAdminRolesDetails)
  adminRoleAdminRolesDetails$: any;
  moduleList: any[] = [];
  adminRole: any;
  // moduleId: any;
  constructor(
    private _route: ActivatedRoute,
    private _roleAndPermissionSvc: RoleAndPermissionService,
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService,
    private ngRedux: NgRedux<IAppState>,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getParams();
    // this.getModuleList();
    this.adminRoles$.subscribe((roles: any) => {
      this._router.navigate(['/recruiter/settings/roles-and-permission/roles/', roles[0]?.Id])
    });
  }

  getParams() {
    this._route.paramMap.subscribe({
      next: (params: any) => {
        if (params) {
          let roleId = params.get('roleId');
          if (roleId) {
            this.getRoleDetails(roleId);
          }
        }
      },
      error: (err: any) => {
        if (err) {
        }
      },
    });
  }

  // getRoleDetails(RoleId: string) {
  //   this._roleAndPermissionSvc.GetAdminRoleDetails(RoleId).subscribe({
  //     next: (response: any) => {
  //       if (response) {
  //
  //         this.adminRole = response;
  //         this.moduleList = response?.moduleList;
  //       }
  //     },
  //     error: (err: any) => {
  //       if (err) {
  //
  //       }
  //     },
  //   });
  // }

  getRoleDetails(RoleId: string) {
    // this.ngRedux.dispatch({ type: FETCH_ADMIN_ROLE_DETAILS });
    this._adminRoleAndPermissionSvc.LoadRoleDetails(RoleId);
    this.adminRoleAdminRolesDetails$.subscribe({
      next: (response: any) => {
        if (response) {
          this.adminRole = response;
          this.moduleList = response?.RoleModule;
          console.log('moduleList: ', this.moduleList);
          // this.ngRedux.dispatch({
          //   type: FETCH_ADMIN_ROLE_DETAILS_SUCCESS,
          //   payload: this.adminRole?.Data,
          // });
        }
      },
      error: (err: any) => {
        if (err) {
          // this.ngRedux.dispatch({
          //   type: FETCH_ADMIN_ROLE_DETAILS_ERROR,
          //   payload: err,
          // });
        }
      },
    });
  }

  getModuleList() {
    setTimeout(() => {
      this.moduleList = this._roleAndPermissionSvc.GetModuleList();
      this._adminRoleAndPermissionSvc.GetRoleModuleList().subscribe({
        next: (response: any) => {
          if (response) {
          }
        },
        error: (err: any) => {
          if (err) {
            console.warn('Error: ', err);
          }
        },
      });
    }, 3000);
  }

  onReceive(Update: any) {
    console.log('Update: ', Update);
    // const data = { ...Update.RoleModule };
    // const RoleModuleId = Update.RoleModuleId;

    // const Payload: UpdateRoleModule = {
    //   Name: data?.ModuleName,
    //   CreatedAt: data?.CreatedAt,
    //   RegionName: data?.RegionName,
    //   CreatedBy: data?.CreatedBy,
    //   Permission: {
    //     Create: data?.Permission.Create,
    //     Delete: data?.Permission.Delete,
    //     Update: data?.Permission.Update,
    //     View: data?.Permission.View,
    //   },
    // };

    // this._adminRoleAndPermissionSvc
    //   .UpdateModule(Payload, RoleModuleId)
    //   .subscribe({
    //     next: (response: any) => {
    //       if (response) {
    //
    //         this.getParams();
    //       }
    //     },
    //     error: (err: any) => {
    //       if (err) {
    //
    //       }
    //     },
    //   });

    //

    // if (Update) {
    //   console.log('Update: ', Update);
    //   console.log('this.adminRole: ', this.adminRole);
    //   let x = Object.assign(this.adminRole, Update);
    //   console.log('x : ', x);

    //   this._roleAndPermissionSvc.UpdateAdminRole(x).subscribe({
    //     next: (response: any) => {
    //       if (response) {
    //
    //         this.getParams();
    //       }
    //     },
    //     error: (err: any) => {
    //       if (err) {
    //
    //       }
    //     },
    //   });
    // } else {
    //   alert('Permission not assigned to module');
    // }

    // const Payload: Permission = {
    //   RegionName: Update.RegionName,
    //   ModuleName: Update.ModuleName,
    //   Permission: {
    //     Create: Update.Permission.Create,
    //     Delete: Update.Permission.Delete,
    //     Update: Update.Permission.Update,
    //     View: Update.Permission.View,
    //   }
    // };
    // console.log('Update: ', Payload);
  }

  onUpdatePermission(Data: any) {
    console.log('Data: ', Data);
    const Payload: UpdatePermission = {
      PermissionId: Data?.Permission?.Id,
      Permission: {
        Create: Data?.Permission?.Create,
        Delete: Data?.Permission?.Delete,
        Update: Data?.Permission?.Update,
        View: Data?.Permission?.View,
      },
    };

    this._adminRoleAndPermissionSvc
      .UpdatePermission(Payload?.PermissionId, Payload?.Permission)
      .subscribe({
        next: (response: any) => {
          if (response) {
          }
        },
        error: (err: any) => {
          if (err) {
            console.warn('Error: ', err);
          }
        },
      });
  }

  removeModule(Module: any) {
    console.log('Module: ', Module);
  }
}

export interface Permission {
  RegionName: string;
  ModuleName: string;
  // CreatedAt: string;
  // CreatedBy: string;
  Permission: {
    Create: boolean;
    Delete: boolean;
    Update: boolean;
    View: boolean;
  };
}
