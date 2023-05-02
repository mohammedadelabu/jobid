import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';

@Component({
  selector: 'app-flag-block-dialog',
  templateUrl: './flag-block-dialog.component.html',
  styleUrls: ['./flag-block-dialog.component.scss'],
})
export class FlagBlockDialogComponent implements OnInit, OnDestroy {
  StatusForm!: FormGroup;
  subscriptions: Subscription[] = [];
  isSending = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { email: string; status: string },
    private _fb: FormBuilder,
    private _identitySvc: IdentityService,
    private _messengerSvc: MessengerService,
    private _toastr: ToastrService,
    public dialogRef: MatDialogRef<FlagBlockDialogComponent>
  ) { }

  ngOnInit(): void {
    console.log('data: ', this.data);
    this.buildForm();
  }

  buildForm() {
    this.StatusForm = this._fb.group({
      StatusComment: '',
    });
  }

  onSubmit() {
    const Payload = {
      ...this.data,
      statusComment: this.StatusForm.value?.StatusComment,
    };

    this.isSending = true;
    let subscription = this._identitySvc
      .updateStatusAndComment(Payload)
      .subscribe({
        next: (response: any) => {

          if (response) {
            this.isSending = false;
            this._messengerSvc.sendSubject('Account Status changed!!!');
            this._toastr.success("Account Status changed!!!");
            this.closeDialog();
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          this._toastr.error("Failed, try again");
          this.isSending = false;
        },
      });

    this.subscriptions.push(subscription);
  }



  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
