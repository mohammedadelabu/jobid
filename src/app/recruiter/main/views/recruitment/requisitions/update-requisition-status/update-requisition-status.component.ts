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
import { IdentityService } from 'src/app/services/identity.service';
import {
  RequisitionService,
  RequisitionStatus,
} from 'src/app/services/requisition.service';

@Component({
  selector: 'app-update-requisition-status',
  templateUrl: './update-requisition-status.component.html',
  styleUrls: ['./update-requisition-status.component.scss'],
})
export class UpdateRequisitionStatusComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  UpdateRequisitionStatusForm!: FormGroup;
  RequisitionStatusList: RequisitionStatus[] = [];
  Requisition: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _fb: FormBuilder,
    private _identitySvc: IdentityService,
    private _requisitionSvc: RequisitionService,
    public dialogRef: MatDialogRef<UpdateRequisitionStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { requisition: any }
  ) {}

  ngOnInit(): void {
    console.log('requisition> :', this.data.requisition);
    this.onGetRecruisitionStatusList();
    this.buildForm();
    this.Requisition = this.data.requisition;
  }

  ngAfterContentInit(): void {
    this.prefillFormData();
  }

  buildForm() {
    this.UpdateRequisitionStatusForm = this._fb.group({
      Status: ['', Validators.required],
    });
  }

  prefillFormData() {
    this.UpdateRequisitionStatusForm.controls['Status'].setValue(
      this.data.requisition.RequisitionStatus
    );
  }

  onGetRecruisitionStatusList() {
    this.RequisitionStatusList =
      this._requisitionSvc.GetRequisitionStatusList();
  }
  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
  }

  onSubmit() {
    console.log(
      'UpdateRequisitionStatusForm: ',
      this.UpdateRequisitionStatusForm.value
    );
    const Payload = {
      Status: this.UpdateRequisitionStatusForm.value.Status,
      Id: this.data.requisition.Id,
      UpdatedBy: this.onGetUpdatedBy(),
    };
    
    let subscription = this._requisitionSvc
      .PatchRequisitionStatus(Payload)
      .subscribe({
        next: (response: any) => {
          
          if (response) {
            this._requisitionSvc.SendRequisitionMessengerSubject(
              'Requisition status updated!'
            );
            this.closeDialog();
          }
        },
        error: (err: any) => {
          
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
