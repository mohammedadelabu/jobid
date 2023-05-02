import { NgRedux } from '@angular-redux/store';
import {
  AfterContentInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConvertDateTime } from 'src/app/models/classes/convert-date';
import { Requisition } from 'src/app/models/types/requisition';
import { RequisitionService } from 'src/app/services/requisition.service';
import { IAppState } from 'src/STORE/store';
import {
  UPDATE_REQUISITION,
  UPDATE_REQUISITION_ERROR,
  UPDATE_REQUISITION_SUCCESS,
} from 'src/STORE/_requisition.store/requisition.actions';

@Component({
  selector: 'app-update-source-week',
  templateUrl: './update-source-week.component.html',
  styleUrls: ['./update-source-week.component.scss'],
})
export class UpdateSourceWeekComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  UpdateSourceWeekForm!: FormGroup;
  subscriptions: Subscription[] = [];
  constructor(
    private _fb: FormBuilder,
    private _requisitionSvc: RequisitionService,
    public dialogRef: MatDialogRef<UpdateSourceWeekComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { requisition: any },
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit(): void {
    this.buildForm();
    console.log('requisition: ', this.data.requisition);
  }

  ngAfterContentInit(): void {
    this.prefillFormData();
  }
  buildForm() {
    this.UpdateSourceWeekForm = this._fb.group({
      SourceWeek: '',
      SourceWeekStartDate: '',
      SourceWeekEndDate: '',
    });
  }

  prefillFormData() {
    this.UpdateSourceWeekForm.controls['SourceWeek'].setValue(
      this.data.requisition.SourceWeek
    );
    this.UpdateSourceWeekForm.controls['SourceWeekStartDate'].setValue(
      // this.data.requisition.SourceWeekStartDate

      new ConvertDateTime(
        this.data.requisition?.SourceWeekStartDate
      ).getDAteWithoutTime()
    );
    this.UpdateSourceWeekForm.controls['SourceWeekEndDate'].setValue(
      // this.data.requisition.SourceWeekEndDate

      new ConvertDateTime(
        this.data.requisition?.SourceWeekEndDate
      ).getDAteWithoutTime()
    );
  }

  onSubmit() {
    console.log('UpdateSourceWeekForm: ', this.UpdateSourceWeekForm.value);
    const Payload: Requisition = Object.assign(
      { ...this.data.requisition },
      this.UpdateSourceWeekForm.value
    );
    
    this.ngRedux.dispatch({ type: UPDATE_REQUISITION });
    this.upDateRequisition(Payload);
  }

  upDateRequisition(Payload: Requisition) {
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
