import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Country } from 'ngx-intl-tel-input/lib/model/country.model';
import { Subscription } from 'rxjs';
import { UserProfile } from 'src/app/models/types/user-profile';
import { CountryListService } from 'src/app/services/country-list.service';
import { IdentityService } from 'src/app/services/identity.service';
import {
  ProfileSetupProgressNavigationService,
  progressNav,
} from 'src/app/services/profile-setup-progress-navigation.service';
import { ProfileSetupService } from 'src/app/services/profile-setup.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.scss'],
})
export class PersonalProfileComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  progressNavigation: progressNav[] = [
    {
      name: 'Personal profile',
      navLink: 'personal-profile',
      isDone: false,
      isActive: false,
    },
    {
      name: 'Work history',
      navLink: 'work-history',
      isDone: false,
      isActive: false,
    },
    {
      name: 'education',
      navLink: 'education',
      isDone: false,
      isActive: false,
    },
    {
      name: 'Skills',
      navLink: 'skills',
      isDone: false,
      isActive: false,
    },
    {
      name: 'Projects',
      navLink: 'projects',
      isDone: false,
      isActive: false,
    },
    {
      name: 'Others',
      navLink: 'others',
      isDone: false,
      isActive: false,
    },
  ];
  currentRoute!: string;
  personalProfileForm!: FormGroup;
  YearsOfExperienceList = [
    {
      name: 'less than 1',
      value: 'less than 1',
    },
    {
      name: '1-3',
      value: '1-3',
    },
    {
      name: 'more than 3',
      value: 'more than 3',
    },
  ];
  countryList!: any[];
  candidateId: any;
  userProfile: any;
  userInformation: any;
  Subscriptions: Subscription[] = [];

  constructor(
    private _profileSetupProgressNavigationSvc: ProfileSetupProgressNavigationService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _countryList: CountryListService,
    private _identitySvc: IdentityService,
    private _profileSvc: ProfileService,
    private _route: ActivatedRoute,
    private _profileSetupSvc: ProfileSetupService
  ) {}

  ngOnInit(): void {
    this.onSendprogressNavigationSubj(this.progressNavigation);
    this.currentRoute = '';
    this.onCheckRouteEvents();
    this.buildForm();
    this.onGetCountryList();
    // this.getUrlParams();
  }

  ngAfterViewInit(): void {
    this.getCandidateToSetupProfile();
  }

  buildForm() {
    this.personalProfileForm = this._formBuilder.group({
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Email: '',
      PhoneNumber: '',
      LinkedinPlatform: '',
      PortfolioPlatform: '',
      Profession: ['', Validators.required],
      YearsOfExperience: ['', Validators.required],
      SalaryExpectationPerHour: '',
      Country: ['', Validators.required],
      State: ['', Validators.required],
      City: ['', Validators.required],
      Street: '',
      PostalCode: ['', Validators.required],
    });
  }

  onPrefillPersonalInformation(CandidateInformation: any) {
    this.personalProfileForm.controls['FirstName'].setValue(
      CandidateInformation.FirstName
    );
    this.personalProfileForm.controls['MiddleName'].setValue(
      CandidateInformation.MiddleName
    );
    this.personalProfileForm.controls['LastName'].setValue(
      CandidateInformation.LastName
    );
    this.personalProfileForm.controls['Email'].setValue(
      CandidateInformation.Email
    );
    this.personalProfileForm.controls['PhoneNumber'].setValue(
      CandidateInformation.PhoneNumber
    );
  }
  onPrefillProfileInformation(CandidateProfile: any) {
    this.personalProfileForm.controls['Profession'].setValue(
      CandidateProfile.Profession
    );
    this.personalProfileForm.controls['YearsOfExperience'].setValue(
      CandidateProfile.YearsOfExperience
    );
    this.personalProfileForm.controls['SalaryExpectationPerHour'].setValue(
      CandidateProfile.SalaryExpectationPerHour
    );
    this.personalProfileForm.controls['Country'].setValue(
      CandidateProfile.Country
    );
    this.personalProfileForm.controls['State'].setValue(CandidateProfile.State);
    this.personalProfileForm.controls['City'].setValue(CandidateProfile.City);
    this.personalProfileForm.controls['Street'].setValue(
      CandidateProfile.Street
    );
    this.personalProfileForm.controls['PostalCode'].setValue(
      CandidateProfile.PostalCode
    );
    this.personalProfileForm.controls['LinkedinPlatform'].setValue(
      CandidateProfile.LinkedinPlatform
    );
    this.personalProfileForm.controls['PortfolioPlatform'].setValue(
      CandidateProfile.PortfolioPlatform
    );
  }

  onGetCountryList() {
    this.countryList = this._countryList.getCountryList();  }

  onCheckRouteEvents() {
    let subscription = this._router.events.subscribe({
      next: (event: any) => {
        if (event instanceof NavigationStart) {
          // Show progress spinner or progress bar

        }
        if (event instanceof NavigationEnd) {
          // Hide progress spinner or progress bar
          this.currentRoute = event.url;

          this.onSendprogressNavigationSubj(this.progressNavigation);
        }

        if (event instanceof NavigationError) {
          // Hide progress spinner or progress bar

          // Present error to user
          // console.log(event.error);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.Subscriptions.push(subscription);
  }

  onSendprogressNavigationSubj(progressNavigation: progressNav[]) {
    this._profileSetupProgressNavigationSvc.sendProgressNavigationSubj(
      progressNavigation
    );
  }

  getCandidateToSetupProfile() {
    this.candidateId = this._profileSetupSvc.getCandidateToSetUpProfileId();
    this.onGetCandidateDetails(this.candidateId);
    this.onGetCandidateProfile(this.candidateId);
  }

  onGetCandidateDetails(CandidateId: string) {
    let subscription = this._identitySvc.getUserById(CandidateId).subscribe({
      next: (response: any) => {
        if (response) {
          this.userInformation = response;
          this.onPrefillPersonalInformation(this.userInformation);
        }
      },
    });
    this.Subscriptions.push(subscription);
  }

  onGetCandidateProfile(CandidateId: string) {
    let subscription = this._profileSvc
      .getCandidateProfile(CandidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.userProfile = response?.Data[0];
            this.onPrefillProfileInformation(this.userProfile);
          }
        },
      });
    this.Subscriptions.push(subscription);
  }

  updateProfile(ProfileId: string, UserProfile: UserProfile) {
    const Payload = {
      Profession: UserProfile.Profession,
      Country: UserProfile.Country,
      State: UserProfile.State,
      PostalCode: UserProfile.PostalCode,
      City: UserProfile.City,
      //
      Street: UserProfile.Street,
      SalaryExpectationPerHour: UserProfile.SalaryExpectationPerHour,
      //
      YearsOfExperience: UserProfile.YearsOfExperience,
      PortfolioPlatform: UserProfile.PortfolioPlatform,
      LinkedinPlatform: UserProfile.LinkedinPlatform,
      UpdatedBy: '',
      Guarantor1_FullName: UserProfile.Guarantor1_FullName,
      GuarantorI_RelationshipToKin: UserProfile.GuarantorI_RelationshipToKin,
      GuarantorI_Phone: UserProfile.GuarantorI_Phone,
      GuarantorI_EmailAddress: UserProfile.GuarantorI_EmailAddress,
      Guarantor2_Fullname: UserProfile.Guarantor2_Fullname,
      Guarantor2_RelationshipToKin: UserProfile.Guarantor2_RelationshipToKin,
      Guarantor2_PhoneNumber: UserProfile.Guarantor2_PhoneNumber,
      Guarantor2_EmailAddress: UserProfile.Guarantor2_EmailAddress,
      AddressDocumentUrl: UserProfile.AddressDocumentUrl,
      IsAddressVerified: UserProfile.IsAddressVerified,
      IsGuarantorsVerified: UserProfile.IsGuarantorsVerified,
      CV_URL: UserProfile.CV_URL,
      AcademicAndProfessionalCertificateUrls:
        UserProfile.AcademicAndProfessionalCertificateUrls,
      isPoofOfExpertiseVerified: UserProfile.isPoofOfExpertiseVerified,
      IdDocumentUrl: UserProfile.IdDocumentUrl,
      IdDocumentType: UserProfile.IdDocumentType,
      isGovernmentIdDocumentVerified:
        UserProfile.isGovernmentIdDocumentVerified,
      SelfietUrl: UserProfile.SelfietUrl,
      isSelfieVerified: UserProfile.isSelfieVerified,
    };

    let subscription = this._profileSvc
      .updateCandidateProfile(ProfileId, Payload)
      .subscribe({
        next: (response: any) => {
          if (response) {

            this._router.navigate(['/candidate/profile-setup/work-history']);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.Subscriptions.push(subscription);
  }

  onSubmit() {
    const Payload = {
      ...this.userProfile,
      Profession: this.personalProfileForm.value?.Profession,
      SalaryExpectationPerHour:
        this.personalProfileForm.value?.SalaryExpectationPerHour,
      YearsOfExperience: this.personalProfileForm.value?.YearsOfExperience,
      Country: this.personalProfileForm.value?.Country,
      State: this.personalProfileForm.value?.State,
      City: this.personalProfileForm.value?.City,
      Street: this.personalProfileForm.value?.Street,
      PostalCode: this.personalProfileForm.value?.PostalCode,
      LinkedinPlatform: this.personalProfileForm.value?.LinkedinPlatform,
      PortfolioPlatform: this.personalProfileForm.value?.PortfolioPlatform,
    };

    this.updateProfile(this.userProfile.Id, Payload);
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
