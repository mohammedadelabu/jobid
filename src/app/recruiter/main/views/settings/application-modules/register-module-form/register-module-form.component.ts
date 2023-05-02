import { NgRedux } from '@angular-redux/store';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AddModule,
  AdminRoleAndPermissionService,
} from 'src/app/services/admin-role-and-permission.service';
import { IdentityService } from 'src/app/services/identity.service';
import { IAppState } from 'src/STORE/store';
import {
  ADD_APPLICATION_MODULE,
  ADD_APPLICATION_MODULE_ERROR,
  ADD_APPLICATION_MODULE_SUCCESS,
} from 'src/STORE/_applicationModule.store/applicationModule.action';

@Component({
  selector: 'app-register-module-form',
  templateUrl: './register-module-form.component.html',
  styleUrls: ['./register-module-form.component.scss'],
})
export class RegisterModuleFormComponent implements OnInit {
  @Output() closeAddModuleForm = new EventEmitter();
  constructor(
    private _identitySvc: IdentityService,
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService,
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit(): void {}

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
  }

  onSubmit(registerModuleForm: any) {
    this.ngRedux.dispatch({ type: ADD_APPLICATION_MODULE });
    console.log('registerModuleForm: ', registerModuleForm.value);
    const Payload: AddModule = {
      Name: registerModuleForm.value.ModuleName,
      CreatedAt: new Date().toDateString(),
      CreatedBy: this.onGetUpdatedBy(),
      RegionName: '',
      Permission: {
        Create: false,
        Delete: false,
        Update: false,
        View: false,
      },
    };
    
    this._adminRoleAndPermissionSvc.AddModule(Payload).subscribe({
      next: (response: any) => {
        if (response) {
          
          this.ngRedux.dispatch({
            type: ADD_APPLICATION_MODULE_SUCCESS,
            payload: response.Data,
          });
          registerModuleForm.reset();
          this._adminRoleAndPermissionSvc.LoadModuleList();
          this._adminRoleAndPermissionSvc.SendCloseAddMouleDialogBehaviorSubjectMsg(
            true
          );
        }
      },
      error: (err: any) => {
        if (err) {
          
          this.ngRedux.dispatch({
            type: ADD_APPLICATION_MODULE_ERROR,
            payload: err,
          });
        }
      },
    });
  }

  onCancel() {
    console.log('close!');
    this.closeAddModuleForm.emit(false);
  }
}
