import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ValidateNgxIntlTelInput } from 'src/app/models/classes/validate-ngx-intl-tel-input';
import { Country } from 'src/app/models/types/country';
import { ConvertNewCompanyLeadToDeal } from 'src/app/models/types/deal';
import { CertificationService } from 'src/app/services/certification.service';
import { CompanyService } from 'src/app/services/company.service';
import { CountryListService } from 'src/app/services/country-list.service';
import { DealService } from 'src/app/services/deal.service';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-convert-lead-to-deal',
  templateUrl: './convert-lead-to-deal.component.html',
  styleUrls: ['./convert-lead-to-deal.component.scss'],
})
export class ConvertLeadToDealComponent implements OnInit, OnDestroy {
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
  NEW_COMPANY = CompanyOptions.NEW_COMPANY;
  companyId: any;
  companyFormData: any;
  contactFormDetailsFormData: any;
  //
  PhoneNumber: any;
  uploadCompanyLogoError!: string;
  isDoneUploadingImage!: boolean;
  constructor(
    private _fb: FormBuilder,
    private _LocationSvc: CountryListService,
    private _certificationSvc: CertificationService,
    private _dealSvc: DealService,
    private _route: ActivatedRoute,
    private _companySvc: CompanyService,
    private _identitySvc: IdentityService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.onGetLocation();
    this.buildForm();
    this.onGetLeadId();
    this._companySvc.LoadCompanyList();
    this.onPrefillFormWithCompanyDetails();
  }

  buildForm() {
    this.CompanyInformationForm = this._fb.group({
      CompanyName: '',
      CompanyEmail: ['', [Validators.required, Validators.email]],
      Address: ['', Validators.required],
      Location: ['', Validators.required],
      CompanySize: '',
      Website: '',
      VATReistration: ['', Validators.required],
      Description: '',
    });

    this.AddCompanyContactForm = this._fb.group({
      ContactFirstName: '',
      ContactLastName: '',
      ContactEmail: '',
      ContactPhoneNumber: '',
    });
  }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();

    return updatedBy;
  }
  onPrefillFormWithCompanyDetails() {
    let subscription = this.companyDetails$.subscribe({
      next: (company: any) => {
        if (company) {
          // this.CompanyInformationForm.controls['CompanyEmail'].setValue(company.EmailAddress)
          this.CompanyInformationForm.controls['CompanyEmail'].setValue(
            company.EmailAddress
          );
          this.CompanyInformationForm.controls['Address'].setValue(
            company.Address
          );
          this.CompanyInformationForm.controls['Location'].setValue(
            company.Location
          );
          this.CompanyInformationForm.controls['CompanySize'].setValue(
            company.Size
          );
          this.CompanyInformationForm.controls['Website'].setValue(
            company.Website
          );
          this.CompanyInformationForm.controls['Description'].setValue(
            company.Description
          );
          this.CompanyInformationForm.controls['PhoneNumber'].setValue(
            company.PhoneNumber
          );
          this.CompanyInformationForm.controls['VATReistration'].setValue(
            company.VATReistration
          );
          this.logoImgSrc = company?.LogoUrl;
          this.companyId = company?.CompanyId;
        }
      },
      error: (err: any) => {
        if (err) {
        }
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetLocation() {
    this.LocationList = this._LocationSvc.getCountryList();
  }

  onCompanySelected() {
    switch (this.CompanySelector) {
      case '':
        this.CompanyInformationForm.reset();
        this.isExistingCompany = true;
        break;
      case this.NEW_COMPANY:
        this.CompanyInformationForm.reset();
        this.isExistingCompany = false;
        break;

      default:
        this._companySvc.LoadCompanyDetails(this.CompanySelector);
        this.isExistingCompany = true;
        break;
    }

    // if (this.CompanySelector == '') {
    //   this.CompanyInformationForm.reset();
    //   this.isExistingCompany = true;
    // } else {
    //   this._companySvc.LoadCompanyDetails(this.CompanySelector);
    //   this.isExistingCompany = false;
    // }
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
        this.CompanyLogoLabel = this.uploadedFile.name;
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
        },
      });
    this.subscriptions.push(subscription);
  }

  onSubmitCompanyInfoForm() {
    this.isphoneNumberError = this.validatePhoneNumber(
      this.PhoneNumber?.internationalNumber
    );
    // console.log("this.isphoneNumberError: ", this.isphoneNumberError)
    // const Payload1: ConvertLeadToDeal = {
    const Payload1: any = {
      LeadId: this.leadId,
      CompanyId: this.companyId,
      // ContactFirstName: this.AddCompanyContactForm.value.ContactFirstName,
      // ContactLastName: this.AddCompanyContactForm.value.ContactLastName,
      // ContactEmail: this.AddCompanyContactForm.value.ContactEmail,
      // ContactPhoneNumber: this.AddCompanyContactForm.value.ContactPhoneNumber,
    };

    // const Payload2: ConvertLeadToDeal = {
    // const Payload2: any = {
    //   LeadId: this.leadId,
    //   Company: {
    //     Name: this.CompanyInformationForm.value.CompanyName,
    //     ContactDetails: this.CompanyInformationForm.value.ContactDetails,
    //     Address: this.CompanyInformationForm.value.Address,
    //     Description: this.CompanyInformationForm.value.Description,
    //     Location: this.CompanyInformationForm.value.Location,
    //     Size: this.CompanyInformationForm.value.CompanySize.toString(),
    //     Website: this.CompanyInformationForm.value.Website,
    //     VATReistration: this.CompanyInformationForm.value.VATReistration,
    //     PhoneNumber:
    //       this.CompanyInformationForm.value.PhoneNumber?.internationalNumber,
    //     EmailAddress: this.CompanyInformationForm.value.CompanyEmail,
    //     LogoUrl: this.uploadedImage,
    //     UpdatedBy: this.onGetUpdatedBy(),
    //     InviteCompany: false,
    //   },
    //   // ContactFirstName: this.AddCompanyContactForm.value.ContactFirstName,
    //   // ContactLastName: this.AddCompanyContactForm.value.ContactLastName,
    //   // ContactEmail: this.AddCompanyContactForm.value.ContactEmail,
    //   // ContactPhoneNumber: this.AddCompanyContactForm.value.ContactPhoneNumber,
    // };

    const Payload2: any = {
      ...this.CompanyInformationForm.value,
      PhoneNumber: this.PhoneNumber?.internationalNumber,
      UpdatedBy: this.onGetUpdatedBy(),
      LogoUrl: this.uploadedImage,
      InviteCompany: false,
    };
    console.log('Payload2: ', Payload2);

    this.isExistingCompany
      ? (this.companyFormData = Payload1)
      : (this.companyFormData = Payload2);
    // switch (this.isExistingCompany) {
    //   case true:
    //     console.log('Payload1: ', Payload1);
    //     break;
    //   case false:
    //     console.log('Payload2: ', Payload2);
    //     break;
    //   default:
    //     break;
    // }
  }

  onSubmitCompanyContactsForm() {
    this.isContactPhoneNumberError = this.validatePhoneNumber(
      this.AddCompanyContactForm.value.PrimaryContactPhoneNumber
    );
    // let StepOneFormData: ConvertLeadToDeal = {
    //   LeadId: this.leadId,
    //   ...this.CompanyInformationForm.value,
    //   PhoneNumber:
    //     this.CompanyInformationForm.value.PhoneNumber.internationalNumber,
    //   LogoUrl: this.uploadedImage,
    // };
    let contactDetailsFormData: any = {
      ...this.AddCompanyContactForm.value,
      ContactPhoneNumber:
        this.AddCompanyContactForm.value.ContactPhoneNumber
          ?.internationalNumber,
    };
    // console.log('StepTwoFormData: ', StepTwoFormData.PrimaryContactPhoneNumber);
    const Payload: ConvertNewCompanyLeadToDeal = Object.assign(
      this.companyFormData,
      contactDetailsFormData
    );

    this.convertLeadToDeal(Payload);
  }

  validatePhoneNumber(PhoneNumber: any): boolean | any {
    let x = new ValidateNgxIntlTelInput(PhoneNumber, false);
    return x.check();
  }

  convertLeadToDeal(Payload: ConvertNewCompanyLeadToDeal) {
    let subscription = this._dealSvc.ConvertNewCompanyLeadToDeal(Payload).subscribe({
      next: (response) => {
        if (response) {
          this.CompanyInformationForm.reset();
          this.AddCompanyContactForm.reset();
          this._router.navigate(['/recruiter/crm/leads']);
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
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

enum CompanyOptions {
  NEW_COMPANY = 'NEW COMPANY',
  EXISTING_COMPANY = 'EXISTING COMPANY',
}
