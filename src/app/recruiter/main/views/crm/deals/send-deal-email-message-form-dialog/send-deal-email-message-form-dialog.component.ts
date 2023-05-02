import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DealService, SendDealMail } from 'src/app/services/deal.service';
import { SendLeadEmailMessageFormDialogComponent } from '../../leads/send-lead-email-message-form-dialog/send-lead-email-message-form-dialog.component';

@Component({
  selector: 'app-send-deal-email-message-form-dialog',
  templateUrl: './send-deal-email-message-form-dialog.component.html',
  styleUrls: ['./send-deal-email-message-form-dialog.component.scss'],
})
export class SendDealEmailMessageFormDialogComponent implements OnInit {
  EmailMessageForm: any;
  emailAddressList: any;
  Message = '';
  Subject = '';
  emptyEmailListMessage!: string;
  // successResponeMessage: any;
  // isMessageSent = false;
  isSending = false;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { EmailAddressList: string; DealId: any },
    public dialogRef: MatDialogRef<SendLeadEmailMessageFormDialogComponent>,
    private _dealSvc: DealService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.emailAddressList = this.data.EmailAddressList;
  }

  onSubmit(EmailMessageForm: any) {
    console.log('EmailMessageForm: ', EmailMessageForm.value);
    const Payload: SendDealMail = {
      Subject: EmailMessageForm.value.Subject,
      DealId: this.data.DealId,
      Body: EmailMessageForm.value.Message,
      Destination: [...this.data.EmailAddressList],
      // Destination: ['iballi2017@gmail.com'],
    };

    if (this.data.EmailAddressList.length == 0) {
      this.emptyEmailListMessage = 'Kindly select a contact';
    } else {
      if (EmailMessageForm.valid) {
        this.isSending = true;
        this._dealSvc.SendDealEmailMessage(Payload).subscribe({
          next: (response: any) => {
            if (response) {
              this.isSending = false;
              // this.successResponeMessage = response?.ResponseMessage;
              let successMessage = response?.ResponseMessage;
              this.toastr.success(successMessage);
              this.emailAddressList = [];
              this.Subject = '';
              this.Message = '';
              this.closeDialog();
            }
          },
          error: (err: any) => {
            if (err) {
              // console.warn('Error: ', err);
              // this.toastr.error(err?.statusText);
              this.toastr.error("Failed, try again later");
              this.isSending = false;
            }
          },
        });
      }
    }
  }

  onRemoveTag(item: any) {
    const index: any = this.emailAddressList.indexOf(item, 0);
    if (index > -1) {
      this.emailAddressList.splice(index, 1);
    }
  }

  closeDialog() {
    this.dialogRef.close('Closed!');
  }
}
