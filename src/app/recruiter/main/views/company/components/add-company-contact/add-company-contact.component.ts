import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ValidateNgxIntlTelInput } from 'src/app/models/classes/validate-ngx-intl-tel-input';
import { AddIdentifiedContact } from 'src/app/models/types/contact';
import { CreateUserWithRole } from 'src/app/models/types/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ContactService } from 'src/app/services/contact.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';

@Component({
  selector: 'app-add-company-contact',
  templateUrl: './add-company-contact.component.html',
  styleUrls: ['./add-company-contact.component.scss'],
})
export class AddCompanyContactComponentDialog implements OnInit, OnDestroy {
  CompanyContactForm!: FormGroup;
  CompanyId: any;
  loggedInUser: any;
  invitedBy!: string;
  isphoneNumberError = false;
  subscriptions: Subscription[] = [];
  PhoneNumber: any;
  CompanyName!: string;
  isSending = false;
  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA)
    public data: { CompanyId: string; CompanyName: string },
    private _identitySvc: IdentityService,
    private _authenticationSvc: AuthenticationService,
    public dialogRef: MatDialogRef<AddCompanyContactComponentDialog>,
    private _messengerSvc: MessengerService,
    private toastr: ToastrService,
    private _contactSvc: ContactService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loggedinUser();
    this.getParams();
    console.log(this.data);
    this.CompanyId = this.data.CompanyId;
    this.CompanyName = this.data.CompanyName;
  }

  getParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        this.CompanyId = params.get('companyId');
      },
    });
    this.subscriptions.push(subscription);
  }

  buildForm() {
    this.CompanyContactForm = this._fb.group({
      FirstName: [''],
      LastName: [''],
      MiddleName: '',
      Email: ['', [Validators.email]],
      PhoneNumber: '',
      Role: '',
      SendMail: false,
      InviteContact: false,
    });
    return this.CompanyContactForm;
  }

  validatePhoneNumber(PhoneNumber: any): boolean | any {
    let x = new ValidateNgxIntlTelInput(PhoneNumber, false);
    return x.check();
  }

  onSubmit() {
    // this.isphoneNumberError = this.validatePhoneNumber(
    //   this.CompanyContactForm.value.PhoneNumber?.internationalNumber
    // );

    let pFirstname = this.CompanyContactForm.value.FirstName;
    let pLastname = this.CompanyContactForm.value.LastName;
    let pEmail = this.CompanyContactForm.value.Email;
    let pPhone = this.CompanyContactForm.value.PhoneNumber?.internationalNumber;

    if(!pFirstname){
      pFirstname = '';
    }
    if(!pEmail){
      pEmail = '';
    }
    if(!pPhone){
      pPhone = '';
    }
    if(!pLastname){
      pLastname = '';
    }


    let Payload: AddIdentifiedContact = {


      // FirstName: this.CompanyContactForm.value.FirstName,
      FirstName: pFirstname,
      LastName: pLastname,
      CompanyName: this.data.CompanyName,
      EmailAddress: pEmail,
      PhoneNumber: pPhone,
      AnnualRevenue: 0,
      Identifier: this.CompanyId,
    };
    console.log('Payload: ', Payload);

    // if (this.isphoneNumberError || this.CompanyContactForm.invalid) {
      // return;
    // } else {
      this.addUserToCompany(Payload);
    // }
  }

  addUserToCompany(Payload: AddIdentifiedContact) {
    this.isSending = true;
    let subscription = this._contactSvc
      .AddNewCompanyContact(Payload)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.isSending = false;
            this._messengerSvc.sendSubject(
              'Contact successfully added to company!'
            );
            this.toastr.success('Contact successfully added to company!');
            this.dialogRef.close();
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          this.isSending = false;
          this.toastr.error('Adding contact fails, try again!');
        },
      });
    this.subscriptions.push(subscription);
  }

  loggedinUser() {
    this.loggedInUser = this._identitySvc.getLoggedInUserData().Id;
    console.log('this.loggedInUser: ', this.loggedInUser);
    let subscription = this._authenticationSvc
      .getAUthUserDetails(this.loggedInUser)
      .subscribe({
        next: (response: any) => {
          console.log('Logged in person', response);
          this.invitedBy = `${response.FirstName} ${response.LastName}`;
          console.log('this.invitedByn', this.invitedBy);
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
