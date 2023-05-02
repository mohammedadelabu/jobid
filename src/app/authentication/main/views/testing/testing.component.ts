import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Region, UserRole } from 'src/app/models/types/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IdentityService } from 'src/app/services/identity.service';
import { RegionService } from 'src/app/services/region.service';
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
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {

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
  regionList: Region[] = [];
  userRoles: UserRole[] = [
    {
      name: 'Candidate',
      value: 'member',
    },
    {
      name: 'Recruiter',
      value: 'administrator',
    },
  ];
  constructor(
    private _fb: FormBuilder,
    private _authSvc: AuthenticationService,
    private _regionSvc: RegionService,
    // private _identitySvc: IdentityService,
    private _router: Router) { }

  ngOnInit(): void {
  }

}
