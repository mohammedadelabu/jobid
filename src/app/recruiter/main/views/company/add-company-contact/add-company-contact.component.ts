import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CreateUserWithRole } from 'src/app/models/types/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-add-company-contact',
  templateUrl: './add-company-contact.component.html',
  styleUrls: ['./add-company-contact.component.scss'],
})
export class AddCompanyContactComponent implements OnInit, OnDestroy {
  CompanyContactForm!: FormGroup;
  CompanyId: any;
  loggedInUser: any;
  isphoneNumberError = false;
  invitedBy!: string;
  subscriptions: Subscription[] = [];
  constructor(
    private _fb: FormBuilder,
    private _identitySvc: IdentityService,
    private _authenticationSvc: AuthenticationService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loggedinUser();
  }

  buildForm() {
    this.CompanyContactForm = this._fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      MiddleName: '',
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', Validators.required],
      Role: '',
      SendMail: true,
      InviteContact: false,
    });
    return this.CompanyContactForm;
  }

  loggedinUser() {
    this.loggedInUser = this._identitySvc.getLoggedInUserData().Id;
    // console.log('this.loggedInUser: ', this.loggedInUser);
    let subscription = this._authenticationSvc
      .getAUthUserDetails(this.loggedInUser)
      .subscribe({
        next: (response: any) => {
          // console.log('Logged in person', response);
          this.invitedBy = `${response.FirstName} ${response.LastName}`;
          // console.log('this.invitedByn', this.invitedBy);
        },
      });
    this.subscriptions.push(subscription);
  }

  onSubmit() {
    // console.log(
    //   'this.CompanyContactForm.value: ',
    //   this.CompanyContactForm.value
    // );
    // console.log('this.CompanyId: ', this.CompanyId);
    let companyId = localStorage.getItem('COMPANY_ID_FOR_CONTACT');

    let Payload: any = {
      Email: this.CompanyContactForm.value.Email,
      Role: this.CompanyContactForm.value.Role,
      CompanyId: companyId,
    };

    this.addUserToCompany(Payload);
  }

  addUserToCompany(Payload: any) {
    let subscription = this._identitySvc.addUserToCompany(Payload).subscribe({
      next: (response: any) => {
        this._toastr.success(response?.ResponseMessage);

        // if (response) {
        //   this._messengerSvc.sendSubject('User successfully added to contact!');
        //   this.dialogRef.close();
        // }
        this._router.navigate([
          `/recruiter/crm/companies/company-details/${Payload.CompanyId}`,
        ]);
      },
      error: (err: any) => {
        if (err) {
          // console.warn('Error: ', err);
          this._toastr.success(err?.statusText);
          // if (err.status === 400) {
          //   this.registerAccount();
          // }
        }
      },
    });
    this.subscriptions.push(subscription);
  }

  registerAccount() {
    const data: CreateUserWithRole = {
      FirstName: this.CompanyContactForm.value.FirstName,
      LastName: this.CompanyContactForm.value.LastName,
      MiddleName: this.CompanyContactForm.value.MiddleName,
      Email: this.CompanyContactForm.value.Email,
      SendMail: this.CompanyContactForm.value.SendMail,
      Password: 'MYpassword01@#',
      ConfirmPassword: 'MYpassword01@#',
      Role: 'member',
      PhoneNumber:
        this.CompanyContactForm.value.PhoneNumber?.internationalNumber,
      PasswordCreatedByAdmin: true,
      Status: 'Registered',
      StatusComment: 'Your account has been registered',
      CV_URL: '',
      InvitedBy: this.invitedBy,
    };
    if (this.CompanyContactForm.value.PhoneNumber === null) {
      this.isphoneNumberError = true;
      return;
    }
    if (this.isphoneNumberError) {
      this.isphoneNumberError = false;
    }
    console.log('create user data: ', data);
    let subscription = this._authenticationSvc
      .registerUserWithRole(data)
      .subscribe({
        next: (response: any) => {
          let companyId = localStorage.getItem('COMPANY_ID_FOR_CONTACT');
          if (response && companyId) {
            console.log('response: ', response + '&&' + companyId);
            let Payload: any = {
              Email: response?.user.Email,
              Role: '',
              CompanyId: companyId,
            };
            this.addUserToCompany(Payload);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  // onSubmit() {
  //   const data: CreateUserWithRole = {
  //     FirstName: this.CompanyContactForm.value.FirstName,
  //     LastName: this.CompanyContactForm.value.LastName,
  //     MiddleName: this.CompanyContactForm.value.MiddleName,
  //     Email: this.CompanyContactForm.value.Email,
  //     SendMail: this.CompanyContactForm.value.SendMail,
  //     Password: 'MYpassword01@#',
  //     ConfirmPassword: 'MYpassword01@#',
  //     Role: 'member',
  //     PhoneNumber:
  //       this.CompanyContactForm.value.PhoneNumber?.internationalNumber,
  //     PasswordCreatedByAdmin: true,
  //     Status: 'Registered',
  //     StatusComment: 'Your account has been registered',
  //     CV_URL: '',
  //     InvitedBy: this.invitedBy,
  //   };
  //   if (this.CompanyContactForm.value.PhoneNumber === null) {
  //     this.isphoneNumberError = true;
  //     return;
  //   }
  //   if (this.isphoneNumberError) {
  //     this.isphoneNumberError = false;
  //   }
  //   console.log('data: ', data);
  //   this._authenticationSvc.registerUserWithRole(data).subscribe({
  //     next: (response: any) => {
  //       let companyId = localStorage.getItem('COMPANY_ID_FOR_CONTACT');
  //       if (response && companyId) {
  //
  //         console.log('response: ', response + '&&' + companyId);
  //         let Payload: any = {
  //           Email: response?.user.Email,
  //           Role: '',
  //           CompanyId: companyId,
  //         };
  //         this.addUserToCompany(Payload);
  //       }
  //     },
  //     error: (err: any) => {
  //       console.warn('Error: ', err);
  //     },
  //   });
  // }

  // addUserToCompany(UserEmail: string) {
  //   this._identitySvc.addUserToCompany(UserEmail).subscribe({
  //     next: (response: any) => {
  //
  //     },
  //     error: (err: any) => {
  //       console.warn('Error: ', err);
  //     },
  //   });
  // }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
