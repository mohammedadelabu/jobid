import { NgRedux } from '@angular-redux/store';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Requisition } from 'src/app/models/types/requisition';
import { IdentityService } from 'src/app/services/identity.service';
import {
  RequisitionStatus,
  RequisitionService,
} from 'src/app/services/requisition.service';
import { IAppState } from 'src/STORE/store';
import {
  ADD_REQUISITION,
  ADD_REQUISITION_ERROR,
  ADD_REQUISITION_SUCCESS,
} from 'src/STORE/_requisition.store/requisition.actions';

@Component({
  selector: 'app-add-requisition',
  templateUrl: './add-requisition.component.html',
  styleUrls: ['./add-requisition.component.scss'],
})
export class AddRequisitionComponent implements OnInit, OnDestroy {
  AddRequisitionForm!: FormGroup;

  requisitionStatusList: RequisitionStatus[] = [];
  recruiter: any;
  handler: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<AddRequisitionComponent>,
    // private _identitySvc: IdentityService,
    private _requisitionSvc: RequisitionService,
    @Inject(MAT_DIALOG_DATA) public data: { RecruiterData: string },
    private ngRedux: NgRedux<IAppState>,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    // this.onGetUpdatedBy();
    this.onGetRequisitionList();
    console.log('RecruiterData: ', this.data?.RecruiterData);
    this.handler = this.data?.RecruiterData;
  }

  buildForm() {
    this.AddRequisitionForm = this._fb.group({
      Client: ['', Validators.required],
      JobRole: ['', Validators.required],
      SalesRepresentative: ['', Validators.required],
      RequisitionStatus: ['', Validators.required],
      SourceWeek: ['', Validators.required],
      SourceWeekStartDate: ['', Validators.required],
      SourceWeekEndDate: ['', Validators.required],
    });
  }

  // onGetUpdatedBy() {
  //   let updatedBy = this._identitySvc.updatedBy();
  //   let Email = this._identitySvc.updatedBy();
  //   this. getLoggedInUserDetails(UserEmail: string)
  //
  //   return updatedBy;
  // }

  onGetRequisitionList() {
    this.requisitionStatusList =
      this._requisitionSvc.GetRequisitionStatusList();
  }

  onSubmit() {
    console.log('AddRequisitionForm: ', this.AddRequisitionForm.value);
    const Payload: Requisition = {
      ...this.AddRequisitionForm.value,
      Recruiter: this.handler?.Recruiter,
      // UpdatedBy: this.onGetUpdatedBy(),
      UpdatedBy: this.handler?.UpdatedBy,
    };
    // const Payload = {
    //   Client: this.AddRequisitionForm.value.Client,
    //   JobRole: this.AddRequisitionForm.value.JobRole,
    //   SalesRepresentative: this.AddRequisitionForm.value.SalesRepresentative,
    //   RequisitionStatus: this.AddRequisitionForm.value.RequisitionStatus,
    //   UpdatedBy: this.onGetUpdatedBy(),
    // };

    if (!Payload.Recruiter && !Payload.UpdatedBy) {
      this.dialogRef.close('closed!');
    } else {
      this.ngRedux.dispatch({ type: ADD_REQUISITION });
      this.addRequisition(Payload, this.handler?.UserId);
    }
  }

  addRequisition(Payload: Requisition, UserId: string) {
    let subscription = this._requisitionSvc
      .AddRequisition(Payload, this.handler?.UserId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.ngRedux.dispatch({
              type: ADD_REQUISITION_SUCCESS,
              Payload: Payload,
            });
            this.AddRequisitionForm.reset();
            this.closeDialog();
            this._requisitionSvc.SendRequisitionMessengerSubject(
              'reload requisitions'
            );
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          this.ngRedux.dispatch({ type: ADD_REQUISITION_ERROR, error: err });
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
