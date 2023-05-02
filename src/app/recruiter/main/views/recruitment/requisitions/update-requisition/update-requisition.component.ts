import { NgRedux } from '@angular-redux/store';
import {
  AfterContentInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  ConvertDate,
  ConvertDateTime,
} from 'src/app/models/classes/convert-date';
import { Requisition } from 'src/app/models/types/requisition';
import { IdentityService } from 'src/app/services/identity.service';
import {
  RequisitionService,
  RequisitionStatus,
} from 'src/app/services/requisition.service';
import { IAppState } from 'src/STORE/store';
import {
  UPDATE_REQUISITION,
  UPDATE_REQUISITION_ERROR,
  UPDATE_REQUISITION_SUCCESS,
} from 'src/STORE/_requisition.store/requisition.actions';

@Component({
  selector: 'app-update-requisition',
  templateUrl: './update-requisition.component.html',
  styleUrls: ['./update-requisition.component.scss'],
})
export class UpdateRequisitionComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  UpdateRequisitionForm!: FormGroup;

  requisitionStatusList: RequisitionStatus[] = [];
  SourceWeekStartDate!: string;
  subscriptions: Subscription[] = [];
  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateRequisitionComponent>,
    private _identitySvc: IdentityService,
    private _requisitionSvc: RequisitionService,
    @Inject(MAT_DIALOG_DATA) public data: { requisition: any },
    private ngRedux: NgRedux<IAppState>
  ) {}
  ngOnInit(): void {
    this.buildForm();
    this.onGetRequisitionList();
    console.log('requisition: ', this.data.requisition);

    let x = new ConvertDate(
      this.data.requisition?.Created_At
    ).getDAteWithoutTime();
    console.log('converted Created_At date: ', x);
    this.SourceWeekStartDate = new ConvertDate(
      this.data.requisition?.SourceWeekStartDate
    ).getDAteWithoutTime();
    console.log(
      'converted SourceWeekStartDate date: ',
      this.SourceWeekStartDate
    );
  }

  ngAfterContentInit(): void {
    this.prefillFormData();
  }

  buildForm() {
    this.UpdateRequisitionForm = this._fb.group({
      Client: ['', Validators.required],
      JobRole: ['', Validators.required],
      SalesRepresentative: ['', Validators.required],
      RequisitionStatus: ['', Validators.required],
      SourceWeek: '',
      SourceWeekStartDate: '',
      SourceWeekEndDate: '',
    });
  }

  prefillFormData() {
    this.UpdateRequisitionForm.controls['Client'].setValue(
      this.data.requisition?.Client
    );
    this.UpdateRequisitionForm.controls['JobRole'].setValue(
      this.data.requisition?.JobRole
    );
    this.UpdateRequisitionForm.controls['SalesRepresentative'].setValue(
      this.data.requisition?.SalesRepresentative
    );
    this.UpdateRequisitionForm.controls['RequisitionStatus'].setValue(
      this.data.requisition?.RequisitionStatus
    );
    this.UpdateRequisitionForm.controls['SourceWeek'].setValue(
      this.data.requisition?.SourceWeek
    );
    this.UpdateRequisitionForm.controls['SourceWeekStartDate'].setValue(
      new ConvertDateTime(
        this.data.requisition?.SourceWeekStartDate
      ).getDAteWithoutTime()
    );
    this.UpdateRequisitionForm.controls['SourceWeekEndDate'].setValue(
      new ConvertDateTime(
        this.data.requisition?.SourceWeekEndDate
      ).getDAteWithoutTime()
    );
  }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
  }

  onGetRequisitionList() {
    this.requisitionStatusList =
      this._requisitionSvc.GetRequisitionStatusList();
  }

  onSubmit() {
    console.log('UpdateRequisitionForm: ', this.UpdateRequisitionForm.value);
    const Payload: Requisition = {
      ...this.UpdateRequisitionForm.value,
      Id: this.data.requisition?.Id,
      Recruiter: this.data.requisition?.Recruiter,
      UpdatedBy: this.onGetUpdatedBy(),
    };
    
    this.ngRedux.dispatch({ type: UPDATE_REQUISITION });
    let subscription = this._requisitionSvc
      .UpdateRequisition(Payload)
      .subscribe({
        next: (response: any) => {
          
          if (response) {
            // this.ngRedux.dispatch({type: UPDATE_REQUISITION_SUCCESS, id: this.data.requisition?.id});
            let data = {
              Id: this.data.requisition?.Id,
              payload: Payload,
            };
            this.ngRedux.dispatch({ type: UPDATE_REQUISITION_SUCCESS, data });
            // this._requisitionSvc.SendRequisitionMessengerSubject("Requisition status updated!");
            this.closeDialog();
          }
        },
        error: (err: any) => {
          
          this.ngRedux.dispatch({ type: UPDATE_REQUISITION_ERROR, error: err });
        },
      });
    this.subscriptions.push(subscription);
  }

  closeDialog() {
    this.dialogRef.close('closed!');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
