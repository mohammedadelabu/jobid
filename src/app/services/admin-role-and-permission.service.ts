import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_ADMIN_ROLE_DETAILS,
  FETCH_ADMIN_ROLE_DETAILS_ERROR,
  FETCH_ADMIN_ROLE_DETAILS_SUCCESS,
  FETCH_ADMIN_ROLE_LIST,
  FETCH_ADMIN_ROLE_LIST_ERROR,
  FETCH_ADMIN_ROLE_LIST_SUCCESS,
} from 'src/STORE/_adminRoleAndPermission.store/adminRoleAndPermission.action';
import {
  FETCH_APPLICATION_MODULE_LIST,
  FETCH_APPLICATION_MODULE_LIST_ERROR,
  FETCH_APPLICATION_MODULE_LIST_SUCCESS,
} from 'src/STORE/_applicationModule.store/applicationModule.action';
import { getModulePermission, moduleShape } from '../helpers/permissions-v2';
// import { getModulePermission, roleModulesShape } from '../helpers/permissions';

@Injectable({
  providedIn: 'root',
})
export class AdminRoleAndPermissionService implements OnDestroy {
  CloseAddMouleDialogBehaviorSubject = new BehaviorSubject<boolean>(true);
  AdminRoleUrl = environment.baseUrl + 'api/Role/';
  AddRoleUrl = this.AdminRoleUrl + 'AddRole';
  UpdateUserRoleUrl = this.AdminRoleUrl + 'UpdateUserRole';
  UpdateRoleModuleUrl = this.AdminRoleUrl + 'UpdateRoleModule';
  GetRoleModulesUrl = this.AdminRoleUrl + 'GetRoleModules';
  GetRolesUrl = this.AdminRoleUrl + 'GetRoles';
  GetRoleDetailsUrl = this.AdminRoleUrl + 'Role';
  DeleteRoleUrl = this.AdminRoleUrl + 'Role';
  AddModuleUrl = this.AdminRoleUrl + 'AddModule';
  UpdateModuleUrl = this.AdminRoleUrl + 'UpdateModule';
  DeleteRoleModuleUrl = this.AdminRoleUrl + 'RoleModule';
  UpdatePermissionUrl = this.AdminRoleUrl + 'UpdatePermission';

  Subscriptions: Subscription[] = [];
  constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) {}

  SendCloseAddMouleDialogBehaviorSubjectMsg(Msg: boolean) {
    this.CloseAddMouleDialogBehaviorSubject.next(Msg);
  }

  AddRole(Payload: AddRole) {
    return this._http.post(this.AddRoleUrl, Payload);
  }

  GetRoleModuleList() {
    return this._http.get(this.GetRoleModulesUrl);
  }

  UpdateUserRole(UserRole: UserRole, UserId: string) {
    return this._http.patch(`${this.UpdateUserRoleUrl}/${UserId}`, UserRole);
  }

  LoadModuleList() {
    this.ngRedux.dispatch({ type: FETCH_APPLICATION_MODULE_LIST });
    return this._http.get(this.GetRoleModulesUrl).subscribe({
      next: (response: any) => {
        if (response) {
          this.ngRedux.dispatch({
            type: FETCH_APPLICATION_MODULE_LIST_SUCCESS,
            payload: response?.Data,
          });
        }
      },
      error: (err: any) => {
        if (err) {
          this.ngRedux.dispatch({
            type: FETCH_APPLICATION_MODULE_LIST_ERROR,
            payload: err?.error,
          });
        }
      },
    });
  }

  GetRoles() {
    return this._http.get(this.GetRolesUrl);
  }

  LoadAdminRoleList() {
    this.ngRedux.dispatch({ type: FETCH_ADMIN_ROLE_LIST });
    return this._http.get(this.GetRolesUrl).subscribe({
      next: (response: any) => {
        if (response) {
          
          this.ngRedux.dispatch({
            type: FETCH_ADMIN_ROLE_LIST_SUCCESS,
            payload: response?.Data,
          });
        }
      },
      error: (err: any) => {
        
        this.ngRedux.dispatch({
          type: FETCH_ADMIN_ROLE_LIST_ERROR,
          payload: err,
        });
      },
    });
  }

  LoadRoleDetails(RoleId: string) {
    this.ngRedux.dispatch({ type: FETCH_ADMIN_ROLE_DETAILS });
    let subscription = this._http
      .get(`${this.GetRoleDetailsUrl}/${RoleId}`)
      .subscribe({
        next: (response: any) => {
          if (response) {
            console.log('response: ', response?.Data);
            let adminRole = response;
            this.ngRedux.dispatch({
              type: FETCH_ADMIN_ROLE_DETAILS_SUCCESS,
              payload: adminRole?.Data,
            });
          }
        },
        error: (err: any) => {
          if (err) {
            
            this.ngRedux.dispatch({
              type: FETCH_ADMIN_ROLE_DETAILS_ERROR,
              payload: err,
            });
          }
        },
      });
    this.Subscriptions.push(subscription);
  }

  AddModule(Payload: AddModule) {
    return this._http.post(this.AddModuleUrl, Payload);
  }

  AddModuleToRole(Payload: AddModuleToRole) {
    return this._http.post(
      `${this.AddModuleUrl}/${Payload.RoleId}`,
      Payload.Module
    );
  }

  UpdateModule(Payload: UpdateRoleModule, ModuleId: string) {
    return this._http.patch(`${this.UpdateModuleUrl}/${ModuleId}`, Payload);
  }

  DeleteRole(RoleId: string) {
    return this._http.delete(`${this.DeleteRoleUrl}/${RoleId}`);
  }

  DeleteModule(ModuleId: string) {
    return this._http.delete(`${this.DeleteRoleModuleUrl}/${ModuleId}`);
  }

  GetUserPermittedRoleModules(Module: string) {
    let currentUser = localStorage.getItem('currentUserData');
    let checkPlacement2: boolean = false;
    if (currentUser) {
      let data = JSON.parse(currentUser);
      // return JSON.parse(currentUser);
      let userPersmitedModules = data?.newRole?.RoleModule;
      // let checkPlacement = roleModulePermission("Placement", userPersmitedModules);
      // console.log('checkPlacement: ', checkPlacement);
      checkPlacement2 = getModulePermission(userPersmitedModules, Module);
      // console.log('checkPlacement2: ', checkPlacement2);
    }
    return checkPlacement2;
  }

  GetModulePermissions = (activeModule: string): any => {
    let currentUser = localStorage.getItem('currentUserData');
    let module: moduleShape | undefined;
    if (currentUser) {
      let data = JSON.parse(currentUser);
      let userPersmitedModules: Array<moduleShape> =
        data?.newRole?.RoleModule;
      module = userPersmitedModules.find(
        (module) => module.ModuleName === activeModule
      );
    }

    return module?.Permission;
  };

  UpdatePermission(PermissionId: string, Payload: Permission) {
    return this._http.patch(
      `${this.UpdatePermissionUrl}/${PermissionId}`,
      Payload
    );
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}

export interface CreateRole {
  RoleName: string;
  CreatedBy: string;
}

export interface AddRole {
  RoleName: string;
  ModuleId: string[];
}

export interface UpdateRoleModule {
  RegionName: string;
  Name: string;
  CreatedAt: string;
  CreatedBy: string;
  Permission: Permission;
}

export interface Permission {
  Create: boolean;
  Delete: boolean;
  Update: boolean;
  View: boolean;
  // Headq: boolean;
  // Branch1: boolean;
}
export interface UpdatePermission {
  PermissionId: string;
  Permission: Permission;
}

export interface AddModule {
  Name: string;
  CreatedAt: string;
  CreatedBy: string;
  RegionName: string;
  Permission: Permission;
}

export interface UpdateModule {
  Name: string;
  UpdatedBy: string;
}

export interface UserRole {
  RoleId: string;
}

export interface AddModuleToRole {
  RoleId: string;
  Module: {
    ModuleId: string;
  };
}

export enum RoleModule {
  DASHBOARD = 'Dashboard',
  CANDIDATES = 'Candidates',
  COMPANY = 'Company',
  RECRUITMENT = 'Recruitment',
  PLACEMENT = 'Placement',
  CRM = 'CRM',
  PROJECT_MANAGEMENT = 'Project management',
  JOB_BORD = 'Job board',
  FINANCIALS = 'Financials',
  CHAT = 'Chat',
}

export enum PermissionName {
  Update = 'Update',
  Create = 'Create',
  Delete = 'Delete',
  View = 'View',
}
