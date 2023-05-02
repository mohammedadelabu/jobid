import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { AdminRoleAndPermissionService } from 'src/app/services/admin-role-and-permission.service';
import { IAppState } from 'src/STORE/store';
import {
  REMOVE_APPLICATION_MODULE,
  REMOVE_APPLICATION_MODULE_ERROR,
  REMOVE_APPLICATION_MODULE_SUCCESS,
} from 'src/STORE/_applicationModule.store/applicationModule.action';

@Component({
  selector: 'app-application-modules',
  templateUrl: './application-modules.component.html',
  styleUrls: ['./application-modules.component.scss'],
})
export class ApplicationModulesComponent implements OnInit {
  @select((s) => s.applicationModules.applicationModules)
  applicationModules$: any;
  @select((s) => s.applicationModules.isLoading) isLoading$: any;
  applicationModuleList: any[] = [];
  isRegisterModule: boolean = false;
  errorMessage: any;
  isEditModule: boolean = false;
  moduleData: any;
  constructor(
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService,
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit(): void {
    this.getRoleModuleList();
    this._adminRoleAndPermissionSvc.CloseAddMouleDialogBehaviorSubject.subscribe(
      (response: any) => {
        if (response) {
          this.isRegisterModule = false;
          this.isEditModule = false;
        }
      }
    );
  }

  getRoleModuleList() {
    this._adminRoleAndPermissionSvc.LoadModuleList();
    // this._adminRoleAndPermissionSvc.GetRoleModuleList().subscribe({
    //   next: (response: any) => {
    //     if (response) {
    //       
    //       this.applicationModuleList = response?.Data;
    //     }
    //   },
    //   error: (err: any) => {
    //     if (err) {
    //       
    //     }
    //   },
    // });
  }

  onRemove(item: any) {
    this.ngRedux.dispatch({ type: REMOVE_APPLICATION_MODULE });
    
    const ModuleId = item?.Id;
    this._adminRoleAndPermissionSvc.DeleteModule(ModuleId).subscribe({
      next: (response: any) => {
        if (response) {
          
          this.ngRedux.dispatch({
            type: REMOVE_APPLICATION_MODULE_SUCCESS,
            payload: ModuleId,
          });
        }
      },
      error: (err: any) => {
        if (err) {
          
          this.ngRedux.dispatch({
            type: REMOVE_APPLICATION_MODULE_ERROR,
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
