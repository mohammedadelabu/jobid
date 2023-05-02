import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IdentityService } from 'src/app/services/identity.service';
import { SendInviteService } from 'src/app/services/send-invite.service';

@Component({
  selector: 'app-invite-candidate-form',
  templateUrl: './invite-candidate-form.component.html',
  styleUrls: ['./invite-candidate-form.component.scss'],
})
export class InviteCandidateFormComponent implements OnInit, OnDestroy {
  // @ViewChild('formBody', { read: TemplateRef }) formBody!: TemplateRef<any>;
  invitationForm!: FormGroup;
  formBodyText: any;
  responseMsg!: string;
  errorMsg: any;
  subscriptions: Subscription[] = [];
  isSending: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private vref: ViewContainerRef,
    private _identity: IdentityService,
    private _sendInviteSvc: SendInviteService,
    public dialogRef: MatDialogRef<InviteCandidateFormComponent>,
    private _toastr: ToastrService,
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
      Email: '',
    });
  }

  onGetCandidateDetails() { }

  onSubmit() {
    // console.log(this.invitationForm.value);
    this.isSending = true;
    const Email = this.invitationForm.value.Email;
    let subscription = this._identity.getUserByEmail(Email).subscribe({
      next: (response: any) => {
        if (response) {
          // console.group('Candidate Details: ', response);
          this.isSending = false;
          this.sendInvite(response);
        }
      },
      error: (err: any) => {
        console.warn('err ', err);
        this.isSending = false;
        this._toastr.error("Candidate does not have an account yet")
        this.errorMsg = err.error;
        // console.warn('this.errorMsg ', this.errorMsg);
        setTimeout(() => {
          this.errorMsg = '';
        }, 2500);
      },
    });
    this.subscriptions.push(subscription);
  }

  sendInvite(Candidate: any) {
    this.isSending = true;
    const Payload = {
      Candidate: true,
      CandidateName: `${Candidate.FirstName} ${Candidate.LastName}`,
      CandidateEmail: `${Candidate.Email}`,
    };

    let subscription = this._sendInviteSvc
      .sendCandidateInvite(Payload)
      .subscribe({
        next: (response: any) => {
          // console.log('response ', response);  
          if (response) {
            this.isSending = false;
            this._toastr.success(`An invite has been sent to ${Payload.CandidateName}`);
            this.closeDialog();
            if (response.status === 200) {
              this.responseMsg = `An invite has been sent to ${Payload.CandidateName}`;
              // this.closeDialog();
            }
            setTimeout(() => {
              this.responseMsg = '';
            }, 2500);
          }

        },
        error: (err: any) => {
          if (err) {
            // console.warn('err ', err);          
            this.errorMsg = err.error;
            this.isSending = false;
            this._toastr.error("Invitation failed!")
            setTimeout(() => {
              this.errorMsg = '';
            }, 2500);
          }
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
