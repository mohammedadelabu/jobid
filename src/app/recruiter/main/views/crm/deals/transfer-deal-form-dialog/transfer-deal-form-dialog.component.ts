import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DealService, TransferDeal } from 'src/app/services/deal.service';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-transfer-deal-form-dialog',
  templateUrl: './transfer-deal-form-dialog.component.html',
  styleUrls: ['./transfer-deal-form-dialog.component.scss']
})
export class TransferDealFormDialogComponent implements OnInit, OnDestroy {
  SelectedColleague: any;
  recruiterList: any;
  Subscriptions: Subscription[] = [];
  fetchingRecruiters: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<TransferDealFormDialogComponent>,
    private _identitySvc: IdentityService, @Inject(MAT_DIALOG_DATA) public data: { DealId: string },
    private _dealSvc: DealService,
    private _toastrSvc: ToastrService) { }

  ngOnInit(): void {
    this.GetAllRecruiters()
  }
  onSelectColleague() {
    // console.log(this.SelectedColleague)
  }

  GetAllRecruiters() {
    this.fetchingRecruiters = true;
    let subscription = this._identitySvc.LoadAllRecruiters().subscribe({
      next: (response: any) => {
        if (response) {
          // console.log("response: ", response)
          this.recruiterList = response?.Data
          this.fetchingRecruiters = false;
        }
      },
      error: (err: any) => {
        if (err) {
          this.fetchingRecruiters = false;
          console.warn("Ërror: ", err)
        }
      }
    })
    this.Subscriptions.push(subscription)
  }

  onTransferDeal(Data: any) {
    // console.log(Data.value)
    const Payload: TransferDeal = {
      ...Data.value,
      DealId: this.data.DealId
    }
    // console.log("Payload: ", Payload)
    let subscription = this._dealSvc.TransferDeal(Payload).subscribe({
      next: (response: any) => {
        if (response) {
          console.log("response: ", response)
          this._toastrSvc.success(response?.ResponseMessage)
          this.closeDialog()
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn("Ërror: ", err)
          this._toastrSvc.error(err?.textStatus)
        }
      }
    });
    this.Subscriptions.push(subscription)
  }

  closeDialog() {
    this.dialogRef.close('Closed!');
  }



  ngOnDestroy(): void {
    this.Subscriptions.forEach((s) => {

      if (!s.closed) {
        s.unsubscribe();
        // console.log('Unsubscribed!!!');
      }
    });
  }
}
