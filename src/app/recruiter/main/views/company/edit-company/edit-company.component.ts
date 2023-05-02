import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ValidateNgxIntlTelInput } from 'src/app/models/classes/validate-ngx-intl-tel-input';
import { UpdateCompany } from 'src/app/models/types/company';
import { Country } from 'src/app/models/types/country';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CertificationService } from 'src/app/services/certification.service';
import { CompanyService } from 'src/app/services/company.service';
import { CountryListService } from 'src/app/services/country-list.service';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss'],
})
export class EditCompanyComponent implements OnInit, OnDestroy {
  @select((s) => s.company.isLoading) isCompanyListLoading$: any;
  EditCompanyForm!: FormGroup;
  rawImg: any;
  imgUrl: any;
  uploadedFile!: any;
  UserImage: any;
  CompanyLogoLabel = 'Upload Company Logo';
  isSelected: boolean = false;
  countryList!: Country[];
  companyId: any;
  companyDetails: any;
  loggedInUser: any;
  invitedBy!: string;
  isphoneNumberError = false;
  subscriptions: Subscription[] = [];
  isSending: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _certificationSvc: CertificationService,
    private _route: ActivatedRoute,
    private _companySvc: CompanyService,
    private _countryListSvc: CountryListService,
    private _identitySvc: IdentityService,
    private _authenticationSvc: AuthenticationService,
    private toastr: ToastrService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.getRouteParams();
    this.buildForm();
    this.onGetCountryList();
    this.loggedinUser();
  }

  buildForm() {
    this.EditCompanyForm = this._fb.group({
      CompanyName: ['', [Validators.required]],
      EmailAddress: ['', [Validators.email]],
      PhoneNumber: '',
      Address: '',
      Location: '',
      CompanySize: '',
      Website: '',
      VATRegistration: [''],
      CompanyLogo: '',
      Description: '',
    });
    return this.EditCompanyForm;
  }
  onGetCountryList() {
    this.countryList = this._countryListSvc.getCountryList();
    // console.log('country list: ', this.countryList);
  }

  // updatedBy() {
  //   this.loggedInUser = this._identitySvc.getLoggedInUserData().Id;
  //   console.log('this.loggedInUser: ', this.loggedInUser);
  // }

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
  getRouteParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        this.companyId = params.get('companyId');
        // console.log(this.companyId);
        this.getCompanyDetails(this.companyId);
      },
      error: (err: any) => {},
    });
    this.subscriptions.push(subscription);
  }

  onSelectFile(e: any) {
    if (e.target.files) {
      const reader = new FileReader();
      this.rawImg = e.target.files[0];
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
        this.uploadedFile = e.target.files[0];
        // this.CompanyLogoLabel = this.uploadedFile.name;
        this.isSelected = true;

        const formData = new FormData();
        formData.append('UploadFile', this.rawImg);

        let subscription = this._certificationSvc
          .uploadCertificationFile(formData)
          .subscribe({
            next: (response: any) => {
              // console.log(response[0].AbsoluteUrl);
              // this.UserImage = response[0].AbsoluteUrl;
              this.companyDetails.LogoUrl = response[0].AbsoluteUrl;
              localStorage.setItem(
                'uploadedResumeFile',
                JSON.stringify(this.UserImage)
              );
            },
            error: (err: any) => {
              console.warn('Error: ', err);
            },
          });
        this.subscriptions.push(subscription);
      };
    }
  }

  getCompanyDetails(companyId: string) {
    let subscription = this._companySvc.getCompanyDetails(companyId).subscribe({
      next: (response: any) => {
        if (response) {
          if (response.ResponseCode == '00') {
            this.companyDetails = response.Data;
            this.prefillFormData();
          }
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  prefillFormData() {
    this.EditCompanyForm.controls['CompanyName'].setValue(
      this.companyDetails.Name
    );
    this.EditCompanyForm.controls['EmailAddress'].setValue(
      this.companyDetails.EmailAddress
    );
    this.EditCompanyForm.controls['Address'].setValue(
      this.companyDetails.Address
    );
    this.EditCompanyForm.controls['Location'].setValue(
      this.companyDetails.Location
    );
    this.EditCompanyForm.controls['CompanySize'].setValue(
      this.companyDetails.Size
    );
    this.EditCompanyForm.controls['Website'].setValue(
      this.companyDetails.Website
    );
    this.EditCompanyForm.controls['VATRegistration'].setValue(
      this.companyDetails.VATReistration
    );
    this.EditCompanyForm.controls['PhoneNumber'].setValue(
      this.companyDetails.PhoneNumber
    );
    this.EditCompanyForm.controls['Description'].setValue(
      this.companyDetails.Description
    );
  }

  validatePhoneNumber(PhoneNumber: any, isBoolean: boolean): boolean | any {
    let x = new ValidateNgxIntlTelInput(PhoneNumber, isBoolean);
    return x.check();
  }

  onSubmit() {
    let pVat = this.EditCompanyForm.value.VATRegistration;
    let pEmail = this.EditCompanyForm.value.EmailAddress;
    let pPhone = this.EditCompanyForm.value.PhoneNumber?.internationalNumber;
    let pLogo = this.companyDetails.LogoUrl;
    if(!pVat){
      pVat = '';
    }
    if(!pEmail){
      pEmail = '';
    }
    if(!pPhone){
      pPhone = '';
    }
    if(!pLogo){
      pLogo = '';
    }

    const data: UpdateCompany = {
      Name: this.EditCompanyForm.value.CompanyName,
      ContactDetails: this.EditCompanyForm.value.EmailAddress,
      EmailAddress: pEmail,
      Address: this.EditCompanyForm.value.Address,
      Location: this.EditCompanyForm.value.Location,
      Size: this.EditCompanyForm.value.CompanySize,
      Website: this.EditCompanyForm.value.Website,
      VATReistration: pVat,
      PhoneNumber: pPhone,
      LogoUrl: pLogo,
      Description: this.EditCompanyForm.value.Description,
      UpdatedBy: this.invitedBy,
      UserId: '',
      InviteCompany: false,
    };
    // console.log('data', data);

    let companyId: any = this.companyDetails.CompanyId;
    // this.isphoneNumberError = this.validatePhoneNumber(data.PhoneNumber, false);

    // if (!this.isphoneNumberError) {
      this.UpdateCompany(data, companyId);
    // }
  }

  UpdateCompany(Payload: UpdateCompany, CompanyId: string) {
    this.isSending = true;

    let subscription = this._companySvc
      .updateCompany(Payload, CompanyId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.isSending = false;
            this.toastr.success(response?.ResponseMessage);
            this._router.navigate(['/recruiter/crm/companies'])
          }
        },
        error: (err: any) => {
          if (err) {
            this.isSending = false;
            console.warn('Error: ', err);
            this.toastr.error('Failed, try again!');
          }
        },
      });
    this.subscriptions.push(subscription);
  }

  goBack() {
    history.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
