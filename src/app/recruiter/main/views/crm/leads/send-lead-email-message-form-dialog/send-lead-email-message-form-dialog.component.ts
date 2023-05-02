import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LeadService, SendLeadMail } from 'src/app/services/lead.service';

@Component({
  selector: 'app-send-lead-email-message-form-dialog',
  templateUrl: './send-lead-email-message-form-dialog.component.html',
  styleUrls: ['./send-lead-email-message-form-dialog.component.scss'],
})
export class SendLeadEmailMessageFormDialogComponent implements OnInit {
  EmailMessageForm: any;
  emailAddressList: any;
  Message = '';
  Subject = '';
  emptyEmailListMessage!: string;
  // successResponeMessage: any;
  // isMessageSent = false;
  isSending = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { EmailAddressList: string },
    public dialogRef: MatDialogRef<SendLeadEmailMessageFormDialogComponent>,
    private _leadSvc: LeadService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.emailAddressList = this.data.EmailAddressList;
  }

  onSubmit(EmailMessageForm: any) {
    console.log('EmailMessageForm: ', EmailMessageForm.value);
    const Payload: SendLeadMail = {
      Subject: EmailMessageForm.value.Subject,
      Body: EmailMessageForm.value.Message,
      Destination: [...this.data.EmailAddressList],
    };

    if (this.data.EmailAddressList.length == 0) {
      this.emptyEmailListMessage = 'Kindly select a lead';
    } else {
      if (EmailMessageForm.valid) {
        this.isSending = true;
        this._leadSvc.SendLeadEmailMessage(Payload).subscribe({
          next: (response: any) => {
            if (response) {
              // this.successResponeMessage = response?.ResponseMessage;
              let successMessage = response?.ResponseMessage;
              this.toastr.success(successMessage);
              this.emailAddressList = [];
              this.Subject = '';
              this.Message = '';
              this.closeDialog();
              this.isSending = false;
            }
          },
          error: (err: any) => {
            if (err) {
              console.warn('Error: ', err);
              this.isSending = false;
              this.toastr.error("Failed, try again later");
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
    this.dialogRef.close('Pizza!');
  }
}
