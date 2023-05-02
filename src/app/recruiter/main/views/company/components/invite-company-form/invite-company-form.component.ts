import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IdentityService } from 'src/app/services/identity.service';
import { SendInviteService } from 'src/app/services/send-invite.service';

@Component({
  selector: 'app-invite-company-form',
  templateUrl: './invite-company-form.component.html',
  styleUrls: ['./invite-company-form.component.scss'],
})
export class InviteCompanyFormComponent implements OnInit, OnDestroy {
  // @ViewChild('formBody', { read: TemplateRef }) formBody!: TemplateRef<any>;
  invitationForm!: FormGroup;
  formBodyText: any;
  responseMsg!: string;
  errorMsg: any;
  subscriptions: Subscription[] = [];
  isSending = false;
  constructor(
    private _formBuilder: FormBuilder,
    // private vref: ViewContainerRef,
    private _identity: IdentityService,
    private _sendInviteSvc: SendInviteService,
    public dialogRef: MatDialogRef<InviteCompanyFormComponent>
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  ngAfterViewInit() {
    // this.vref.createEmbeddedView(this.formBody);
    // console.log(this.formBody.elementRef.nativeElement);
    // console.log(this.formBody.elementRef.nativeElement.nextSibling.innerText);
    // this.formBodyText =
    //   this.formBody.elementRef.nativeElement.nextSibling.innerText;
    this.buildForm();
  }

  buildForm() {
    this.invitationForm = this._formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmit() {
    console.log(this.invitationForm.value);
    const Email = this.invitationForm.value.Email;
    this.isSending = true;
    let subscription = this._identity.getUserByEmail(Email).subscribe({
      next: (response: any) => {
        if (response) {
          this.isSending = false;
          console.group('company Details: ', response);
          this.sendInvite(response);
        }
      },
      error: (err: any) => {
        this.errorMsg = err.error;
        setTimeout(() => {
          this.errorMsg = '';
          this.isSending = false;
        }, 2500);
      },
    });
    this.subscriptions.push(subscription);
  }

  sendInvite(Company: any) {
    const Payload = {
      Company: true,
      CompanyName: `${Company.FirstName} ${Company.LastName}`,
      CompanyEmail: `${Company.Email}`,
    };
    console.log('Payload: ', Payload);
    this.isSending = true;

    let subscription = this._sendInviteSvc
      .sendCompanyInvite(Payload)
      .subscribe({
        next: (response: any) => {
          console.log('response: ', response);
          if (response) {
            // if(response.status === 200){
            this.isSending = false;
            this.responseMsg = `An invite has been sent to ${Payload.CompanyName}`;
            this.invitationForm.reset();
            this.onCloseForm();
            // }

            // setTimeout(() => {
            //   this.responseMsg = "";
            // }, 2500);
          }
        },
        error: (err: any) => {
          if (err) {
            this.isSending = false;
          }
        },
      });
    this.subscriptions.push(subscription);
  }

  onCloseForm() {
    this.dialogRef.close('close');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
