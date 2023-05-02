import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUserWithRole, Region } from 'src/app/models/types/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegionService } from 'src/app/services/region.service';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_REGISTER_AUTH,
  FETCH_REGISTER_AUTH_ERROR,
  FETCH_REGISTER_AUTH_SUCCESS,
} from 'src/STORE/_registerAuth.store/registerAuth.actions';

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @select((s) => s.registerAuth.registerAuth) registerAuth$: any;
  @select((s) => s.registerAuth.isLoading) isLoading$: any;
  RegisterUserForm!: FormGroup;
  isResponseMsg = {
    success: false,
    error: false,
    message: '',
    errorMsg: '',
  };
  isSuccess: boolean = false;
  isphoneNumberError = false;
  formErrorMsg!: string;
  regionList!: Region[];
  constructor(
    private _fb: FormBuilder,
    private _authSvc: AuthenticationService,
    private _regionSvc: RegionService,
    private ngRedux: NgRedux<IAppState>,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getRegionList();
  }

  buildForm() {
    this.RegisterUserForm = this._fb.group(
      {
        FirstName: ['', Validators.required],
        MiddleName: '',
        LastName: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        PhoneNumber: '',
        InvitedBy: ['', [Validators.email]],
        Region: ['', Validators.required],
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

  getRegionList() {
    this.regionList = this._regionSvc.GetRegions();
  }

  register() {
    if (this.RegisterUserForm.value.PhoneNumber === null) {
      this.isphoneNumberError = true;
      return;
    }
    if (this.isphoneNumberError) {
      this.isphoneNumberError = false;
    }
    this.handleRegisterUser(this.RegisterUserForm.value);
  }

  handleRegisterUser(User: any) {
    this.ngRedux.dispatch({ type: FETCH_REGISTER_AUTH });
    // handleRegisterUser(User: any) {
    // if (this.RegisterUserForm.valid) {
    const UserData: CreateUserWithRole = {
      Email: User.Email,
      Password: User.Password,
      ConfirmPassword: User.ConfirmPassword,
      FirstName: User.FirstName,
      LastName: User.LastName,
      MiddleName: User.MiddleName,
      Role: 'member',
      PhoneNumber:
        this.RegisterUserForm.controls['PhoneNumber'].value
          ?.internationalNumber,
      Status: 'Registered',
      InvitedBy: User.InvitedBy,
      Region: this.RegisterUserForm.value.Region,
      StatusComment: 'Your account has been registered',
      CV_URL: '',
      SendMail: false,
    };
    
    if (
      !UserData.FirstName ||
      !UserData.LastName ||
      !UserData.Email ||
      !UserData.PhoneNumber ||
      !UserData.Password ||
      !UserData.ConfirmPassword
    ) {
      this.formErrorMsg = 'Please complete form data!';
      // alert('Complete form data!');
    } else {
      this.formErrorMsg = '';
      this._authSvc.registerUserWithRole(UserData).subscribe({
        next: (response: any) => {
          
          if (response.ResponseCode == '00') {
            this.isResponseMsg.message = 'User account successfully created!';
            this.isResponseMsg.success = true;
            this.isResponseMsg.error = false;
            this._toastr.success(response.ResponseMessage)
            this.ngRedux.dispatch({
              type: FETCH_REGISTER_AUTH_SUCCESS,
              payload: response?.ResponseMessage,
            });
            this.RegisterUserForm.reset();
            this._router.navigate(['/auth']);
          }
          if (response.ResponseCode == 'ERR') {
            this.isResponseMsg.message = response.ResponseMessage;
            this.isResponseMsg.success = false;
            this.isResponseMsg.error = true;
            this._toastr.error(response.ResponseMessage)
            this.ngRedux.dispatch({
              type: FETCH_REGISTER_AUTH_ERROR,
              payload: this.isResponseMsg.message,
            });
          }
        },
        error: (err: any) => {
          if (err) {
            console.error(err);
            this._toastr.error(err.statusText)
            this.ngRedux.dispatch({
              type: FETCH_REGISTER_AUTH_ERROR,
              payload: err,
            });
          }
        },
      });
    }
  }
}
