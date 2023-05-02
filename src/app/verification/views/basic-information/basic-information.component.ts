import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateUserWithRole } from 'src/app/models/types/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
/*
 *@param form
 */
function passwordMatchValidator(form: any) {
  const Password = form.get('Password');
  const ConfirmPassword = form.get('ConfirmPassword');

  if (Password.value != ConfirmPassword.value) {
    ConfirmPassword.setErrors({ PasswordsMatch: true });
  } else {
    ConfirmPassword.setErrors(null);
  }
  return null;
}

/* Custom Validator Functions
 * If the data is valid return null, else return an object
 */
function symbolValidator(control: any) {

  if (control.hasError('required')) return null;
  if (control.hasError('minlength')) return null;

  if (control.value.indexOf('@') > -1) {
    return null;
  } else {
    return { symbol: true };
  }
}

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss'],
})
export class BasicInformationComponent implements OnInit, OnDestroy {
  BasicInformationForm!: FormGroup;
  isResponseMsg = {
    success: false,
    error: false,
    message: '',
    errorMsg: '',
  };
  isSuccess: boolean = false;
  isphoneNumberError = false;
  formErrorMsg!: string;
  PhoneNumber: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _router: Router,
    private _authSvc: AuthenticationService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.BasicInformationForm = this._fb.group(
      {
        Email: ['', [Validators.required, Validators.email]],
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        MiddleName: ['', Validators.required],
        PhoneNumber: '',
        DateOfBirth: ['', Validators.required],
        Password: [
          '',
          // [Validators.required, symbolValidator, Validators.minLength(4)],
          [Validators.required, Validators.minLength(8)],
        ],
        ConfirmPassword: '',
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  onSubmit() {
    if (this.BasicInformationForm.value.PhoneNumber === null) {
      this.isphoneNumberError = true;
      return;
    }
    if (this.isphoneNumberError) {
      this.isphoneNumberError = false;
    }
    const Payload: CreateUserWithRole = {
      Email: this.BasicInformationForm.value.Email,
      Password: this.BasicInformationForm.value.Password,
      SendMail: false,
      ConfirmPassword: this.BasicInformationForm.value.ConfirmPassword,
      FirstName: this.BasicInformationForm.value.FirstName,
      LastName: this.BasicInformationForm.value.LastName,
      MiddleName: this.BasicInformationForm.value.MiddleName,
      CompanyOrUser: 'User',
      // PhoneNumber: this.BasicInformationForm.value.PhoneNumber,
      Role: 'member',
      // PhoneNumber:
      //   this.BasicInformationForm.controls['PhoneNumber'].value
      //     ?.internationalNumber,
      PhoneNumber: this.PhoneNumber?.internationalNumber,
      DateOfBirth: this.BasicInformationForm.value.DateOfBirth,
      Status: 'Registered',
      InvitedBy: '',
      StatusComment: 'Your account has been registered',
      CV_URL: '',
    };
    

    if (
      !Payload.FirstName ||
      !Payload.LastName ||
      !Payload.Email ||
      !Payload.PhoneNumber ||
      !Payload.Password ||
      !Payload.ConfirmPassword
    ) {
      // alert("hello")
      this.formErrorMsg = 'Please complete form data!';
    } else {
      // alert("hi")
      this.formErrorMsg = '';
      this.handleRegistration(Payload);
    }
  }

  handleRegistration(User: any) {
    let subscription = this._authSvc.registerUserWithRole(User).subscribe({
      next: (response: any) => {        
        // console.log(response.ResponseMessage);
        if (response.ResponseCode == '00') {
          this.isResponseMsg.message = 'User account successfully created!';
          this.isResponseMsg.success = true;
          this.isResponseMsg.error = false;
          this.BasicInformationForm.reset();
          // this._authSvc.setToken(response.token);
          // this._authSvc.RefreshToken(response.RefreshToken);
          this._router.navigate([
            `/verification/phone-email-verification/${User?.Email}/${User?.PhoneNumber}`,
          ]);
        }
        if (response.ResponseCode == 'ERR') {
          this.isResponseMsg.message = response.ResponseMessage;
          this.isResponseMsg.success = false;
          this.isResponseMsg.error = true;
        }
      },
      error: (err: any) => {
        console.error(err);
      },
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
