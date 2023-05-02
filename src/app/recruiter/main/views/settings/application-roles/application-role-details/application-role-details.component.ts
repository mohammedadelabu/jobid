import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminRoleAndPermissionService } from 'src/app/services/admin-role-and-permission.service';
import { IAppState } from 'src/STORE/store';
import {
  ADD_APPLICATION_MODULE_TO_ROLE,
  ADD_APPLICATION_MODULE_TO_ROLE_ERROR,
  ADD_APPLICATION_MODULE_TO_ROLE_SUCCESS,
  FETCH_ADMIN_ROLE_DETAILS,
  FETCH_ADMIN_ROLE_DETAILS_ERROR,
  FETCH_ADMIN_ROLE_DETAILS_SUCCESS,
} from 'src/STORE/_adminRoleAndPermission.store/adminRoleAndPermission.action';

@Component({
  selector: 'app-application-role-details',
  templateUrl: './application-role-details.component.html',
  styleUrls: ['./application-role-details.component.scss'],
})
export class ApplicationRoleDetailsComponent implements OnInit {
  @select((s) => s.adminRoles.isLoading)
  isAdminRolesLoading$: any;
  @select((s) => s.adminRoles.adminRoleAdminRolesDetails)
  adminRoleAdminRolesDetails$: any;
  @select((s) => s.applicationModules.applicationModules)
  applicationModules$: any;
  @select((s) => s.applicationModules.isLoading) isModulesLoading$: any;
  adminRole: any;
  moduleList: any[] = [];
  RoleDetails: any;
  isAddModuleToRole = false;
  model: any = {};
  constructor(
    private _route: ActivatedRoute,
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService,
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit(): void {
    this.getRoleDetails();
    this.getModuleList();
  }

  getRoleDetails() {
    this.adminRoleAdminRolesDetails$.subscribe({
      next: (response: any) => {
        if (response) {
          // 
          this.RoleDetails = response;
        }
      },
      error: (err: any) => {
        if (err) {
          
        }
      },
    });
  }

  getModuleList() {
    this.applicationModules$.subscribe({
      next: (list: any) => {
        if (list) {
          console.log('list: ', list);
          this.moduleList = list;
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
        }
      },
    });
  }

  onSubmit(addModuleToRole: any) {
    console.log('addModuleToRole: ', addModuleToRole.value);
    console.log('addModuleToRole: ', {
      RoleId: this.RoleDetails?.Id,
      ModuleId: addModuleToRole.value?.ModuleId,
    });

    const Payload = {
      RoleId: this.RoleDetails?.Id,
      Module: {
        ModuleId: addModuleToRole.value?.ModuleId,
      },
    };

    
    let _module = this.moduleList.find(
      (m: any) => m.Id == Payload.Module.ModuleId
    );
    console.log('_module: ', _module);
    this.ngRedux.dispatch({
      type: ADD_APPLICATION_MODULE_TO_ROLE_SUCCESS,
      payload: _module,
    });
    this.ngRedux.dispatch({ type: ADD_APPLICATION_MODULE_TO_ROLE });
    this._adminRoleAndPermissionSvc.AddModuleToRole(Payload).subscribe({
      next: (response: any) => {
        if (response) {
          
          this.isAddModuleToRole = false;
          this.ngRedux.dispatch({
            type: ADD_APPLICATION_MODULE_TO_ROLE_SUCCESS,
            payload: _module,
          });
          this._adminRoleAndPermissionSvc.LoadRoleDetails(this.RoleDetails?.Id);
          addModuleToRole.reset();
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
          this.ngRedux.dispatch({
            type: ADD_APPLICATION_MODULE_TO_ROLE_ERROR,
            payload: err,
          });
        }
      },
    });
  }
  back() {
    history.back();
  }
}
