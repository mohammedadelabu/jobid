import { NgRedux } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AddModule,
  AdminRoleAndPermissionService,
  UpdateModule,
  UpdateRoleModule,
} from 'src/app/services/admin-role-and-permission.service';
import { IdentityService } from 'src/app/services/identity.service';
import { IAppState } from 'src/STORE/store';
import {
  UPDATE_APPLICATION_MODULE,
  UPDATE_APPLICATION_MODULE_ERROR,
  UPDATE_APPLICATION_MODULE_SUCCESS,
} from 'src/STORE/_applicationModule.store/applicationModule.action';

@Component({
  selector: 'app-edit-module-form',
  templateUrl: './edit-module-form.component.html',
  styleUrls: ['./edit-module-form.component.scss'],
})
export class EditModuleFormComponent implements OnInit {
  @Output() closeEditModuleForm = new EventEmitter();
  @Input() moduleData: any;
  // updateModuleForm: any;
  Module: any;
  constructor(
    private _identitySvc: IdentityService,
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService,
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit(): void {
    console.log('this.moduleData: ', this.moduleData);
    // this.updateModuleForm.value.ModuleName = this.moduleData;
    this.Module = {
      ModuleName: this.moduleData?.ModuleName,
    };
  }
  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
  }

  onSubmit(updateModuleForm: any) {
    this.ngRedux.dispatch({ type: UPDATE_APPLICATION_MODULE });
    console.log('updateModuleForm: ', updateModuleForm);
    console.log('updateModuleForm: ', updateModuleForm?.form);
    console.log('updateModuleForm: ', updateModuleForm.value);
    // moduleData
    const Payload: UpdateRoleModule = {
      // Name: updateModuleForm.value.ModuleName,
      // UpdatedBy: this.onGetUpdatedBy(),
      RegionName: '',
      Name: updateModuleForm.value.ModuleName,
      CreatedAt: this.moduleData?.CreatedAt,
      CreatedBy: this.moduleData?.CreatedBy,
      Permission: {
        Create: false,
        Delete: false,
        Update: false,
        View: false,
      },
    };
    
    this._adminRoleAndPermissionSvc
      .UpdateModule(Payload, this.moduleData?.Id)
      .subscribe({
        next: (response: any) => {
          if (response) {
            
            this.ngRedux.dispatch({
              type: UPDATE_APPLICATION_MODULE_SUCCESS,
              payload: {
                ...response.Data,
                Id: this.moduleData?.Id,
                ModuleName: Payload?.Name,
              },
            });
            updateModuleForm.reset();
            this._adminRoleAndPermissionSvc.SendCloseAddMouleDialogBehaviorSubjectMsg(
              true
            );
          }
        },
        error: (err: any) => {
          if (err) {
            
            this.ngRedux.dispatch({
              type: UPDATE_APPLICATION_MODULE_ERROR,
              payload: err,
            });
          }
        },
      });
  }

  onCancel() {
    this.closeEditModuleForm.emit(false);
  }
}
