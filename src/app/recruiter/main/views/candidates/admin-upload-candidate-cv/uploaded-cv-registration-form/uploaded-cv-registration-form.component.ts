import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CandidateProfile } from 'src/app/models/types/candidate-profile';
import {
  CreateUserWithRole,
  Region,
  UserRole,
} from 'src/app/models/types/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { IdentityService } from 'src/app/services/identity.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-uploaded-cv-registration-form',
  templateUrl: './uploaded-cv-registration-form.component.html',
  styleUrls: ['./uploaded-cv-registration-form.component.scss'],
})
export class UploadedCvRegistrationFormComponent implements OnInit, OnDestroy {
  RegisterUserForm!: FormGroup;
  formIcomplete = true;
  isResponseMsg = {
    success: false,
    error: false,
    message: '',
    errorMsg: '',
  };
  isphoneNumberError = false;
  subscriptions: Subscription[] = [];
  userRoles: UserRole[] = [
    {
      name: 'Member',
      value: 'member',
    },
    {
      name: 'Manager',
      value: 'manager',
    },
    {
      name: 'Administrator',
      value: 'administrator',
    },
    {
      name: 'Director',
      value: 'director',
    },
  ];
  adminUser!: string;
  formIncompleteErrorMsg!: string;
  regionList!: Region[];

  constructor(
    private _fb: FormBuilder,
    private _authSvc: AuthenticationService,
    private _router: Router,
    private _editCandidateCvSvc: EditCandidateCvService,
    private _profileSvc: ProfileService,
    private _identitySvc: IdentityService,
    private _regionSvc: RegionService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getAdminUser();
    this.onGetUpdatedBy();
    this.getRegionList();
  }

  getAdminUser() {
    let adminUserId = this._authSvc.getUserData().Id;
    let subscription = this._authSvc.getAUthUserDetails(adminUserId).subscribe({
      next: (response: any) => {
        if (response) {
          console.log('Admin User: ', response);
          this.adminUser = `${response?.FirstName} ${response?.LastName}`;
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();

    return updatedBy;
  }

  buildForm() {
    let data: any;
    if (localStorage.getItem('uploadedCvData') !== null) {
      let locastorageData: any = localStorage.getItem('uploadedCvData');
      let x = JSON.parse(locastorageData);
      console.log('locastorageData: ', x);

      data = {
        FirstName: x?.name?.split(' ')[0],
        MiddleName: x?.name?.split(' ')[1],
        LastName: x?.name?.split(' ')[2],
        Email: x?.email[0],
        Phone: x?.phone[0],
      };
      console.log('data exist in localstorage: ', data);
    } else {
      data = {
        FirstName: '',
        MiddleName: '',
        LastName: '',
        Email: '',
        Phone: '',
      };
      console.log('data does not exist in localstorage: ', data);
    }

    this.RegisterUserForm = this._fb.group({
      FirstName: [data.FirstName, Validators.required],
      MiddleName: '',
      LastName: [data.LastName, Validators.required],
      Email: [data.Email, [Validators.required, Validators.email]],
      PhoneNumber: [data.Phone, [Validators.required]],
      Region: ['', [Validators.required]],
      Role: 'member',
      SendMail: false,
    });
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
    console.log('form value: ', this.RegisterUserForm.value);
    const Data: CreateUserWithRole = {
      Email: this.RegisterUserForm.controls['Email'].value,
      Password: 'Zarttech00##',
      ConfirmPassword: 'Zarttech00##',
      FirstName: this.RegisterUserForm.controls['FirstName'].value,
      MiddleName: this.RegisterUserForm.controls['MiddleName'].value,
      LastName: this.RegisterUserForm.controls['LastName'].value,
      Role: this.RegisterUserForm.controls['Role'].value,
      PhoneNumber:
        this.RegisterUserForm.controls['PhoneNumber'].value.internationalNumber,
      // PhoneNumber: this.RegisterUserForm.controls['PhoneNumber'].value,
      Status: 'Registered',
      // InvitedBy: this.adminUser,
      // Region: this.RegisterUserForm.controls['Region'].value.Region,
      Region: this.RegisterUserForm.value.Region,
      InvitedBy: this.onGetUpdatedBy(),
      StatusComment: '',
      CV_URL: this.handleGetCVUrl(),
      SendMail: this.RegisterUserForm.controls['SendMail'].value,
      //
      CompanyOrUser: '',
      DateOfBirth: '',
      PasswordCreatedByAdmin: true,
      OldReference: '',
    };
    // this.handleRegisterUser(this.RegisterUserForm.value);
    this.handleRegisterUser(Data);
  }

  handleGetCVUrl() {
    const uploadedResumeFile: any = localStorage.getItem('uploadedResumeFile');
    if (uploadedResumeFile) {
      const resume = JSON.parse(uploadedResumeFile);
      return resume;
    }
  }

  handleRegisterUser(User: CreateUserWithRole) {
    // handleRegisterUser(User: any) {
    if (this.RegisterUserForm.valid) {
      let subscription = this._authSvc.registerUserWithRole(User).subscribe({
        next: (response: any) => {
          if (response.ResponseCode == '00') {
            this.isResponseMsg.message = 'CV successfully uploaded!';
            this.isResponseMsg.success = true;
            this.isResponseMsg.error = false;
            this.RegisterUserForm.reset();
            if (response.user) {
              this._editCandidateCvSvc.setCandidateToEditCvId(response.user.Id);
              this.handleCreateCandidateProfile(response.user.Id);
              // setTimeout(() => {
              //   this._router.navigate(['/edit-candidate-cv/personal-profile']);
              // }, 2000);
            }
          }
          if (response.ResponseCode == 'ERR') {
            // this.responseMsg = response.ResponseMessage;
            // this.isSuccess = true;
            this.isResponseMsg.message = response.ResponseMessage;
            this.isResponseMsg.success = false;
            this.isResponseMsg.error = true;
          }
          // this._identitySvc.setToken(response.token)
          // this._router.navigate(['/user-account'])
        },
        error: (err: any) => {
          console.error(err);
        },
      });
      this.subscriptions.push(subscription);
    } else {
      this.formIncompleteErrorMsg = 'Fill in required information!';
    }
  }

  handleCreateCandidateProfile(CandidateId: any) {
    const data: CandidateProfile = {
      Profession: '',
      Country: '',
      State: '',
      PostalCode: '',
      City: '',
      Street: '',
      PortfolioPlatform: '',
      LinkedinPlatform: '',
      UpdatedBy: this.onGetUpdatedBy(),
      Guarantor1_FullName: '',
      GuarantorI_RelationshipToKin: '',
      GuarantorI_Phone: '',
      GuarantorI_EmailAddress: '',
      Guarantor2_Fullname: '',
      Guarantor2_RelationshipToKin: '',
      Guarantor2_PhoneNumber: '',
      Guarantor2_EmailAddress: '',
    };
    let subscription = this._profileSvc
      .addCandidateProfile(data, CandidateId)
      .subscribe((response: any) => {
        if (response) {
          setTimeout(() => {
            this._router.navigate(['/edit-candidate-cv/personal-profile']);
          }, 2000);
        }
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
