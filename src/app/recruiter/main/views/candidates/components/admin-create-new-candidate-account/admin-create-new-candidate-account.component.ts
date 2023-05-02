import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserWithRole, Region } from 'src/app/models/types/user';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-admin-create-new-candidate-account',
  templateUrl: './admin-create-new-candidate-account.component.html',
  styleUrls: ['./admin-create-new-candidate-account.component.scss'],
})
export class AdminCreateNewCandidateAccountComponent
  implements OnInit, OnDestroy
{
  RegisterUserForm!: FormGroup;
  isphoneNumberError = false;
  isResponseMsg = {
    success: false,
    error: false,
    message: '',
    errorMsg: '',
  };
  subscriptions: Subscription[] = [];
  regionList!: Region[];
  constructor(
    private _fb: FormBuilder,
    private _editedCandidateCvSvc: EditCandidateCvService,
    private _router: Router,
    private _authenticationSvc: AuthenticationService,
    public dialogRef: MatDialogRef<AdminCreateNewCandidateAccountComponent>,
    private _regionSvc: RegionService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getRegionList();
  }
  buildForm() {
    this.RegisterUserForm = this._fb.group({
      FirstName: ['', Validators.required],
      MiddleName: '',
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required]],
      Region: ['', [Validators.required]],
      InvitedBy: ['', [Validators.email]],
      SendMail: false,
    });
  }

  
  getRegionList() {
    this.regionList = this._regionSvc.GetRegions();
  }

  register() {
    // console.log('this.RegisterUserForm: ', this.RegisterUserForm.value);
    if (this.RegisterUserForm.value.PhoneNumber === null) {
      this.isphoneNumberError = true;
      return;
    }
    if (this.isphoneNumberError) {
      this.isphoneNumberError = false;
    }
    if (this.RegisterUserForm.valid) {
      // let adminUserId = this._authenticationSvc.getUserData()?.Id;

      console.log('form value: ', this.RegisterUserForm.value);
      const Data: CreateUserWithRole = {
        Email: this.RegisterUserForm.controls['Email'].value,
        Password: 'Zarttech00##',
        ConfirmPassword: 'Zarttech00##',
        FirstName: this.RegisterUserForm.controls['FirstName'].value,
        LastName: this.RegisterUserForm.controls['LastName'].value,
        MiddleName: this.RegisterUserForm.controls['MiddleName'].value,
        Role: 'member',
        PhoneNumber:
          this.RegisterUserForm.controls['PhoneNumber'].value
            .internationalNumber,
        Status: 'Registered',
        InvitedBy: this.RegisterUserForm.controls['InvitedBy'].value,
        Region: this.RegisterUserForm.value.Region,
        StatusComment: '',
        CV_URL: '',
        SendMail: this.RegisterUserForm.controls['SendMail'].value,
      };
      console.log('Data: ', Data);
      // this.handleRegisterUser(this.RegisterUserForm.value);
      this.handleRegisterUser(Data);
    }
  }

  handleRegisterUser(User: CreateUserWithRole) {
    // handleRegisterUser(User: any) {
    if (this.RegisterUserForm.valid) {
      // console.log("User: ", User);
      let subscription = this._authenticationSvc
        .registerUserWithRole(User)
        .subscribe({
          next: (response: any) => {
            
            // console.log(response.ResponseMessage);
            if (response.user) {
              this.sendUserId(response.user.Id, response.user.Email);
            }
            if (response.ResponseCode == '00') {
              // this.responseMsg = 'User account successfully created!';
              // this._router.navigate(["/authenticate-user"]);

              this.isResponseMsg.message = 'User account successfully created!';
              this.isResponseMsg.success = true;
              this.isResponseMsg.error = false;
              this.closeDialog();
              this.RegisterUserForm.reset();
              const userCreated = response.user;
              console.log('userCreated: ', userCreated);
              this.sendUserId(userCreated.Id, userCreated.Email);
              // this._router.navigate(["/authenticate-user"]);
            } else if (response.ResponseCode == 'ERR') {
              // this.responseMsg = response.ResponseMessage;
              // this.isSuccess = true;
              this.isResponseMsg.message = response.ResponseMessage;
              this.isResponseMsg.success = false;
              this.isResponseMsg.error = true;
            } else {
              this.isResponseMsg.message = '';
              this.isResponseMsg.success = false;
              this.isResponseMsg.error = false;
            }
            // this._authenticationSvc.setToken(response.token)
            // this._router.navigate(['/user-account'])
          },
          error: (err: any) => {
            console.error('Error message: ', err);
            console.error(err);
          },
        });
      this.subscriptions.push(subscription);
    }
  }

  sendUserId(candidateId: string, Email: string) {
    // console.log(candidateId);
    this._editedCandidateCvSvc.setCandidateToEditCvId(candidateId);
    /* */
    let createCvType = localStorage.getItem('admin-create-cv-type');
    console.log('createCvType: ', createCvType);
    if (createCvType === 'CREATE_CV') {
      // this._router.navigate(['/administrator/edit-candidate-data/profile/']);
      this._router.navigate(['/edit-candidate-cv/personal-profile/']);
    } else if (createCvType === 'UPLOAD_CV') {
      this._router.navigate([
        '/administrator/edit-candidate-data/upload-cv/',
        Email,
      ]);
    } else {
      return;
    }
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
