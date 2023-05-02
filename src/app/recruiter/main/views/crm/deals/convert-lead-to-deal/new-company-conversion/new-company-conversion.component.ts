import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ValidateNgxIntlTelInput } from 'src/app/models/classes/validate-ngx-intl-tel-input';
import { Country } from 'src/app/models/types/country';
import {
  ConvertCompanyLeadToDeal,
  ConvertNewCompanyLeadToDeal,
} from 'src/app/models/types/deal';
import { CertificationService } from 'src/app/services/certification.service';
import { CompanyService } from 'src/app/services/company.service';
import { CountryListService } from 'src/app/services/country-list.service';
import { DealService } from 'src/app/services/deal.service';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-new-company-conversion',
  templateUrl: './new-company-conversion.component.html',
  styleUrls: ['./new-company-conversion.component.scss'],
})
export class NewCompanyConversionComponent implements OnInit {
  @select((s) => s.company.companyList) companyList$: any;
  @select((s) => s.company.companyDetails) companyDetails$: any;
  CompanyInformationForm!: FormGroup;
  AddCompanyContactForm!: FormGroup;
  LocationList!: Country[];
  secondFormGroup!: FormGroup;
  firstFormGroup!: FormGroup;
  isphoneNumberError: boolean = false;
  isContactPhoneNumberError!: boolean;
  StepOneFormData!: null;
  rawImg: any;
  imgUrl: any;
  uploadedFile: any;
  isSelected!: boolean;
  uploadedImage: any;
  subscriptions: Subscription[] = [];
  CompanyLogoLabel = 'Upload Company Logo';
  leadId!: any;
  CompanySelector: any;
  isExistingCompany = true;
  logoImgSrc = '';
  companyId: any;
  companyFormData: any;
  contactFormDetailsFormData: any;
  //
  PhoneNumber: any;
  uploadCompanyLogoError!: string;
  isDoneUploadingImage!: boolean;
  ContactPhoneNumber: any;
  ServerErrorMessage: any;
  isSending = false;
  emailTakenError = '';
  phoneTakenError = '';
  isFormValid = true;
  emailAndPhoneValidationLoading = false;
  constructor(
    private _fb: FormBuilder,
    private _LocationSvc: CountryListService,
    private _certificationSvc: CertificationService,
    private _dealSvc: DealService,
    private _route: ActivatedRoute,
    private _companySvc: CompanyService,
    private _identitySvc: IdentityService,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.onGetLocation();
    this.buildForm();
    this.onGetLeadId();
    this._companySvc.LoadCompanyList();
  }

  buildForm() {
    this.CompanyInformationForm = this._fb.group({
      CompanyName: ['', Validators.required],
      CompanyEmail: ['', [Validators.required, Validators.email]],
      Address: '',
      Location: '',
      CompanySize: '',
      Website: '',
      VATReistration: ['', Validators.required],
      Description: '',
    });

    this.AddCompanyContactForm = this._fb.group({
      ContactFirstName: ['', Validators.required],
      ContactLastName: ['', Validators.required],
      ContactEmail: ['', [Validators.required, Validators.email]],
    });
  }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();

    return updatedBy;
  }
  onGetLocation() {
    this.LocationList = this._LocationSvc.getCountryList();
  }

  onGetLeadId() {
    let subscription = this._route.paramMap.subscribe({
      next: (param) => {
        let _leadId = param.get('leadId');
        this.leadId = _leadId;
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
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
        this.uploadImage();
      };
    }
  }

  uploadImage() {
    this.isDoneUploadingImage = true;
    const formData = new FormData();
    formData.append('UploadFile', this.rawImg);
    let subscription = this._certificationSvc
      .uploadCertificationFile(formData)
      .subscribe({
        next: (response: any) => {
          console.log('response: ', response);
          this.uploadedImage = response[0].AbsoluteUrl;
          console.log('this.uploadedImage: ', this.uploadedImage);
          this.isDoneUploadingImage = false;
        },
        error: (err: any) => {
          console.warn(err);
          this.uploadCompanyLogoError = `${err?.statusText}: Something went wrong. Please try again!`;
          this.isDoneUploadingImage = false;
          setTimeout(() => {
            this.uploadCompanyLogoError = '';
          }, 4000);
        },
      });
    this.subscriptions.push(subscription);
  }

  onEmailChange(event: any) {
    const { value } = event.target;

    if (value) {
      this.emailAndPhoneValidationLoading = true
      this._companySvc.verifyEmail(event.target.value).subscribe({
        next: (response) => {
          this.emailAndPhoneValidationLoading = false
          if (response.ResponseCode === '200') {
            this.emailTakenError = '';
            this.isFormValid = this.emailTakenError === '' && this.phoneTakenError === ''
            
          }
        },
        error: (err: any) => {
          this.emailAndPhoneValidationLoading = false
          if (err.status === 400) {
            this.emailTakenError = err.error.ResponseMessage;
            this.isFormValid = this.emailTakenError === '' && this.phoneTakenError === ''
          }
        },
      });
    }
  }

  onPhoneChange() {
    if (this.PhoneNumber) {
      this.emailAndPhoneValidationLoading = true
      this._companySvc
        .verifyPhone(this.PhoneNumber.internationalNumber)
        .subscribe({
          next: (response) => {
            this.emailAndPhoneValidationLoading = false
            if (response.ResponseCode === '200') {
              this.phoneTakenError = '';
              this.isFormValid = this.emailTakenError === '' && this.phoneTakenError === ''
            }
          },
          error: (err: any) => {
            this.emailAndPhoneValidationLoading = false
            if (err.status === 400) {
              this.phoneTakenError = err.error.ResponseMessage;
              this.isFormValid = this.emailTakenError === '' && this.phoneTakenError === ''
            }
          },
        });
    }
  }

  onSubmitCompanyInfoForm() {
    this.isphoneNumberError = this.validatePhoneNumber(
      this.PhoneNumber?.internationalNumber
    );
    const Payload: any = {
      LeadId: this.leadId,
      Company: {
        ...this.CompanyInformationForm.value,
        Name: this.CompanyInformationForm.value.CompanyName,
        EmailAddress: this.CompanyInformationForm.value.CompanyEmail,
        PhoneNumber: this.PhoneNumber?.internationalNumber,
        UpdatedBy: this.onGetUpdatedBy(),
        LogoUrl: this.uploadedImage,
        InviteCompany: false,
      },
    };
    this.companyFormData = Payload;
  }

  // {
  //   "LeadId": "2A81D670-4A9E-4AAD-B83B-F85AA1749B88",
  //   "Company": {
  //     "Name": "A Hace",
  //     "ContactDetails": "928, Jacson str",
  //     "PhoneNumber": "+82920182",
  //     "Address": "Plot 21, Str 12",
  //     "Description": "Lagos",
  //     "Location": "nigeria",
  //     "Size": "10",
  //     "Website": "j.ace.com",
  //     "VATReistration": "928192",
  //     "EmailAddress": "infor@j.ace.com",
  //     "LogoUrl": "string.jpg",
  //     "InviteCompany": false,
  //     "UserId": "0ccb3765-5d15-485f-b526-6a0296dd5770"
  //   },
  //   "ContactFirstName": "James",
  //   "ContactLastName": "Ace",
  //   "ContactEmail": "ace@j.ace.com",
  //   "ContactPhoneNumber": "+8293882"
  // }

  onSubmitCompanyContactsForm() {
    this.isContactPhoneNumberError = this.validatePhoneNumber(
      this.ContactPhoneNumber?.internationalNumber
    );
    let contactDetailsFormData: any = {
      ...this.AddCompanyContactForm.value,
      ContactPhoneNumber: this.ContactPhoneNumber?.internationalNumber,
    };

    const Payload: ConvertNewCompanyLeadToDeal = Object.assign(
      this.companyFormData,
      contactDetailsFormData
    );
    // if (this.isContactPhoneNumberError) {
    //   return;
    // } else {
    //   this.convertNewLeadToDeal(Payload);
    // }
    if (
      !this.isContactPhoneNumberError &&
      this.CompanyInformationForm &&
      this.AddCompanyContactForm
    ) {
      this.convertNewLeadToDeal(Payload);
    }
  }

  validatePhoneNumber(PhoneNumber: any): boolean | any {
    let x = new ValidateNgxIntlTelInput(PhoneNumber, false);
    return x.check();
  }

  convertNewLeadToDeal(Payload: ConvertNewCompanyLeadToDeal) {
    this.isSending = true;
    let subscription = this._dealSvc
      .ConvertNewCompanyLeadToDeal(Payload)
      .subscribe({
        next: (response: any) => {
          console.log('response: ', response);
          if (response) {
            this.isSending = false;
            // this.toastr.success(response?.ResponseMessage)
            this.toastr.success('Lead successfully converted');
            this.CompanyInformationForm.reset();
            this.AddCompanyContactForm.reset();
            this._router.navigate(['/recruiter/crm/leads']);
          }
        },
        error: (err: any) => {
          if (err) {
            this.isSending = false;
            console.warn('Error: ', err);
            this.ServerErrorMessage = err.error?.ResponseMessage;
            this.toastr.error('Conversion failed. Try again!');
          }
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
