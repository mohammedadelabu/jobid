import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  CandidateProfile,
  Profile,
} from 'src/app/models/types/candidate-profile';
import { Country } from 'src/app/models/types/country';
import { Region, UpdateUser } from 'src/app/models/types/user';
import { CertificationService } from 'src/app/services/certification.service';
import { CountryListService } from 'src/app/services/country-list.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { IdentityService } from 'src/app/services/identity.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss'],
})
export class PersonalProfileComponent implements OnInit, OnDestroy {
  personalInformationForm!: FormGroup;
  personalProfileForm!: FormGroup;

  candidateId: any;
  countryList!: Country[];
  imgUrl!: string;
  label = 'Upload Picture';
  isFile = false;
  rawImg!: string;
  UserImage: any;
  uploadedFile: any;
  isphoneNumberError = false;
  candidateData: any;
  responseMsg: any;
  isProfileExist = false;
  profileId: any;
  profileResponseMsg: any;
  subscriptions: Subscription[] = [];
  regionList!: Region[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _countryListSvc: CountryListService,
    private _formBuilder: FormBuilder,
    private _editCandidateCvSvc: EditCandidateCvService,
    private _identitySvc: IdentityService,
    private _certificationSvc: CertificationService,
    private _profileSvc: ProfileService,
    private _regionSvc: RegionService
  ) {}

  ngOnInit(): void {
    this.onGetCandidateId();
    this.getCountryList();
    this.buildCandidateInfoForm();
    this.getCandidateDetails();
    this.buildProfileForm();
    this.onGetUpdatedBy();
    this.getRegionList();
  }

  getCountryList() {
    this.countryList = this._countryListSvc.getCountryList();
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();

    this.getCandidateProfile(this.candidateId);
  }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();

    return updatedBy;
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('UploadFile', this.rawImg);
    let subscription = this._certificationSvc
      .uploadCertificationFile(formData)
      .subscribe({
        next: (response: any) => {
          this.UserImage = response[0].AbsoluteUrl;
        },
        error: (err: any) => {
          console.warn(err);
        },
      });
    this.subscriptions.push(subscription);
  }
  onSelectFile($event: any) {
    if ($event.target.files) {
      const reader = new FileReader();
      this.rawImg = $event.target.files[0];
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
        this.uploadedFile = $event.target.files[0];
        this.label = this.uploadedFile.name;
        this.isFile = true;
        this.uploadImage();
      };
    }
  }

  buildCandidateInfoForm() {
    this.personalInformationForm = this._formBuilder.group({
      FirstName: ['', Validators.required],
      MiddleName: '',
      LastName: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Email: ['', Validators.required],
      Region: ['', Validators.required],
    });
  }

  getRegionList() {
    this.regionList = this._regionSvc.GetRegions();
  }
  getCandidateDetails() {
    let subscription = this._identitySvc
      .getUserById(this.candidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.candidateData = {
              Id: response?.Id,
              FirstName: response?.FirstName,
              MiddleName: response.MiddleName,
              LastName: response.LastName,
              responseName: response.ResponseName,
              Email: response.Email,
              Created_At: response.Created_At,
              ConcurrencyStamp: response.ConcurrencyStamp,
              PhoneNumber: response.PhoneNumber,
              PhoneNumberConfirmed: response.PhoneNumberConfirmed,
              ProfileImageUrl: response.ProfileImageUrl,
              Status: response.Status,
              StatusComment: response.StatusComment,
              InvitedBy: response.InvitedBy,
              Modified_At: response.Modified_At,
              CV_URL: response.CV_URL,
              OldReference: response.OldReference,
              NewReference: response.NewReference,
              SendMail: response.SendMail,
              UpdatedBy: response.UpdatedBy,
            };
            this.prefillCandidateDetailsForm(this.candidateData);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  prefillUserData(candidateData: any) {
    if (candidateData?.ProfileImageUrl) {
      this.imgUrl = candidateData?.ProfileImageUrl;
    } else {
      this.imgUrl = 'assets/images/image-placeholder.jpg';
    }
    this.personalInformationForm.controls['FirstName'].setValue(
      candidateData?.User.FirstName
    );
    this.personalInformationForm.controls['LastName'].setValue(
      candidateData?.User.LastName
    );
    this.personalInformationForm.controls['PhoneNumber'].setValue(
      candidateData?.User.PhoneNumber
    );
    this.personalInformationForm.controls['Email'].setValue(
      candidateData?.User.Email
    );
    this.personalInformationForm.controls['PortfolioPlatform'].setValue(
      candidateData?.PortfolioPlatform
    );
    this.personalInformationForm.controls['LinkedinPlatform'].setValue(
      candidateData?.LinkedinPlatform
    );
  }

  prefillCandidateDetailsForm(candidateData: any) {
    if (candidateData?.ProfileImageUrl) {
      this.imgUrl = candidateData?.ProfileImageUrl;
    } else {
      this.imgUrl = 'assets/images/image-placeholder.jpg';
    }
    this.personalInformationForm.controls['FirstName'].setValue(
      candidateData?.FirstName
    );
    this.personalInformationForm.controls['MiddleName'].setValue(
      candidateData?.MiddleName
    );
    this.personalInformationForm.controls['LastName'].setValue(
      candidateData?.LastName
    );
    this.personalInformationForm.controls['Region'].setValue(
      candidateData?.Region
    );
    this.personalInformationForm.controls['PhoneNumber'].setValue(
      candidateData?.PhoneNumber
    );
    this.personalInformationForm.controls['Email'].setValue(
      candidateData?.Email
    );
  }

  savePersonalInformation() {
    if (this.personalInformationForm.value.PhoneNumber === null) {
      this.isphoneNumberError = true;
      return;
    }
    if (this.isphoneNumberError) {
      this.isphoneNumberError = false;
    }

    /* digging out candidate email address */
    let subscription = this._identitySvc
      .getUserById(this.candidateId)
      .subscribe((response: any) => {
        if (response) {
          let data!: UpdateUser;
          if (this.UserImage) {
            data = {
              FirstName:
                this.personalInformationForm.controls['FirstName'].value,
              MiddleName:
                this.personalInformationForm.controls['MiddleName'].value,
              LastName: this.personalInformationForm.controls['LastName'].value,
              PhoneNumber:
                this.personalInformationForm.controls['PhoneNumber'].value
                  .internationalNumber,
              UserImage: this.UserImage,
              //
              Status: this.candidateData.Status,
              StatusComment: this.candidateData.StatusComment,
              CV_URL: this.candidateData.CV_URL,
              UpdatedBy: this.onGetUpdatedBy(),
              Region: this.candidateData.Region,
            };
          } else {
            data = {
              FirstName:
                this.personalInformationForm.controls['FirstName'].value,
              MiddleName:
                this.personalInformationForm.controls['MiddleName'].value,
              LastName: this.personalInformationForm.controls['LastName'].value,
              PhoneNumber:
                this.personalInformationForm.controls['PhoneNumber'].value
                  .internationalNumber,
              UserImage: response.ProfileImageUrl,
              Region: this.personalInformationForm.controls['Region'].value,
              //
              Status: this.candidateData.Status,
              StatusComment: this.candidateData.StatusComment,
              CV_URL: this.candidateData.CV_URL,
              UpdatedBy: this.onGetUpdatedBy(),
            };
          }
          this.updatePersonalProfile(data, response.Email);
        }
      });
    this.subscriptions.push(subscription);
  }

  updatePersonalProfile(Data: any, Email: any) {
    let subscription = this._identitySvc
      .updatePersonalInfo(Data, Email)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.responseMsg = response;
            this.getCandidateDetails();
            setTimeout(() => {
              this.responseMsg = '';
            }, 2500);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  /* PROFILE INFORMATION */
  buildProfileForm() {
    this.personalProfileForm = this._formBuilder.group({
      Profession: '',
      Country: '',
      State: '',
      PostalCode: '',
      City: '',
      Street: '',
      PortfolioPlatform: '',
      LinkedinPlatform: '',
    });
  }

  getCandidateProfile(candidateId: string) {
    let subscription = this._profileSvc
      .getCandidateProfile(candidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            let profileList = response;
            if (profileList) {
              this.isProfileExist = true;
              console.warn('profile--------->: ', profileList);
              this.profileId = profileList.Id;
              this.prefillProfileForm(profileList);
              // this.prefillUserData(profileList[0]);
            } else {
              this.isProfileExist = false;
            }
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  prefillProfileForm(data: any) {
    console.warn('data--------->: ', data);
    this.personalProfileForm.controls['Profession'].setValue(data.Profession);
    this.personalProfileForm.controls['LinkedinPlatform'].setValue(
      data.LinkedinPlatform
    );
    this.personalProfileForm.controls['PortfolioPlatform'].setValue(
      data.PortfolioPlatform
    );
    this.personalProfileForm.controls['Country'].setValue(
      data?.Country?.toLowerCase()
    );
    this.personalProfileForm.controls['State'].setValue(data?.State);
    this.personalProfileForm.controls['City'].setValue(data?.City);
    this.personalProfileForm.controls['Street'].setValue(data?.Street);
    this.personalProfileForm.controls['PostalCode'].setValue(data?.PostalCode);
  }

  onUpdatePersonalProfile() {
    const data: CandidateProfile = {
      Profession: this.personalProfileForm.value.Profession,
      Country: this.personalProfileForm.value.Country,
      State: this.personalProfileForm.value.State,
      PostalCode: this.personalProfileForm.value.PostalCode,
      PortfolioPlatform: this.personalProfileForm.value.PortfolioPlatform,
      LinkedinPlatform: this.personalProfileForm.value.LinkedinPlatform,
      City: this.personalProfileForm.value.City,
      Street: this.personalProfileForm.value.Street,
      UpdatedBy: this.onGetUpdatedBy(),
    };

    
    let subscription = this._profileSvc
      .getCandidateProfile(this.candidateId)
      .subscribe((response: any) => {
        this.profileId = response.Id;
        this.updateCandidateProfile(this.profileId, data);
      });
    this.subscriptions.push(subscription);
  }

  updateCandidateProfile(ProfileId: any, Data: any) {
    let subscription = this._profileSvc
      .updateCandidateProfile(ProfileId, Data)
      .subscribe((response: any) => {
        if (response) {
          this.profileResponseMsg = response.ResponseMessage;
          setTimeout(() => {
            this.profileResponseMsg = '';
            this._router.navigate(['/edit-candidate-cv/work-history']);
          }, 1500);
        }
      });
    this.subscriptions.push(subscription);
  }

  onPostNewProfileData() {
    const data: CandidateProfile = {
      Profession: this.personalProfileForm.value.Profession,
      Country: this.personalProfileForm.value.Country,
      State: this.personalProfileForm.value.State,
      City: this.personalProfileForm.value.City,
      Street: this.personalProfileForm.value.Street,
      PostalCode: this.personalProfileForm.value.PostalCode,
      PortfolioPlatform: this.personalProfileForm.value.PortfolioPlatform,
      LinkedinPlatform: this.personalProfileForm.value.LinkedinPlatform,
      UpdatedBy: this.onGetUpdatedBy(),
    };
    let subscription = this._profileSvc
      .addCandidateProfile(data, this.candidateId)
      .subscribe((response: any) => {
        if (response) {
          this.responseMsg = response.ResponseMessage;
          this.profileResponseMsg = response.ResponseMessage;
          setTimeout(() => {
            this.profileResponseMsg = '';
            this._router.navigate(['/edit-candidate-cv/work-history']);
          }, 500);
        }
      });
    this.subscriptions.push(subscription);
  }

  onSaveProfileData() {
    if (this.isProfileExist === true) {
      this.onUpdatePersonalProfile();
    } else {
      this.onPostNewProfileData();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
