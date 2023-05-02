import { select } from '@angular-redux/store';
import {
  AfterContentChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UpdateUser } from 'src/app/models/types/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-update-personal-information',
  templateUrl: './update-personal-information.component.html',
  styleUrls: ['./update-personal-information.component.scss'],
})
export class UpdatePersonalInformationComponent implements OnInit {
  @select((s) => s.userByIdEmail.userByIdEmail) userByIdEmail$: any;
  @select((s) => s.userByIdEmail.isLoading) isUserByIdEmailLoading$: any;
  @Input() userEmailAddress: any;
  @Output() closeUpdatePersonalInfoForm = new EventEmitter();

  UpdatePersonalInformationForm!: FormGroup;
  userDetails: any;
  isSubmittingForm!:boolean;
  constructor(
    private _fb: FormBuilder,
    private _identitySvc: IdentityService,
    private _authSvc: AuthenticationService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getUserDetails();
  }

  getUserDetails() {
    this.userByIdEmail$.subscribe({
      next: (response: any) => {
        this.prefillFormData(response);
        // this.prefillFormData(this.userDetails);
        this.userDetails = response;
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }

  buildForm() {
    this.UpdatePersonalInformationForm = this._fb.group({
      FirstName: ['', [Validators.required]],
      MiddleName: '',
      LastName: ['', [Validators.required]],
    });
  }

  prefillFormData(userDetails: any) {
    this.UpdatePersonalInformationForm.controls['FirstName']?.setValue(
      userDetails.FirstName
    );
    this.UpdatePersonalInformationForm.controls['MiddleName']?.setValue(
      userDetails.MiddleName
    );
    this.UpdatePersonalInformationForm.controls['LastName']?.setValue(
      userDetails.LastName
    );
  }

  onCloseUpdatePersonalInfoForm_() {
    this.closeUpdatePersonalInfoForm.emit(false);
  }

  onSubmit() {
    this.isSubmittingForm = true
    const Payload: UpdateUser = {
      FirstName: this.UpdatePersonalInformationForm.value.FirstName,
      LastName: this.UpdatePersonalInformationForm.value.LastName,
      MiddleName: this.UpdatePersonalInformationForm.value.MiddleName,
      //
      UserImage: this.userDetails.UserImage,
      PhoneNumber: this.userDetails.PhoneNumber,
      Status: this.userDetails.Status,
      StatusComment: this.userDetails.StatusComment,
      CV_URL: this.userDetails.CV_URL,
      UpdatedBy: this.userDetails.UpdatedBy,
      ProofOfResidence: this.userDetails.ProofOfResidence,
      GovernmentId: this.userDetails.GovernmentId,
      DateOfBirth: this.userDetails.DateOfBirth,
      CompanyId: this.userDetails.CompanyId,
      PortfolioPlatform: this.userDetails.PortfolioPlatform,
      LinkedinPlatform: this.userDetails.LinkedinPlatform,
      IsVerified: this.userDetails.IsVerified,
      NewReference: this.userDetails.NewReference,
      IsEmailVerified: this.userDetails.IsEmailVerified,
      IsPhoneNumberVerified: this.userDetails.IsPhoneNumberVerified,
      Region: this.userDetails.Region,
    };

    this._identitySvc
      .updatePersonalInfo(Payload, this.userEmailAddress)
      .subscribe({
        next: (response: any) => {
          if (response) this._authSvc.LoadUserData();
          this.isSubmittingForm = false
          this._toastr.success("Updated");
          this.onCloseUpdatePersonalInfoForm_();
        },
        error: (err: any) => {
          if (err) console.warn('Error: ', err)
          this._toastr.error(err.statusText)
        }
      });
  }
}
