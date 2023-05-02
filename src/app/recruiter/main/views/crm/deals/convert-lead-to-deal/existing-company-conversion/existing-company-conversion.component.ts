import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ValidateNgxIntlTelInput } from 'src/app/models/classes/validate-ngx-intl-tel-input';
import { Country } from 'src/app/models/types/country';
import { ConvertCompanyLeadToDeal } from 'src/app/models/types/deal';
import { CertificationService } from 'src/app/services/certification.service';
import { CompanyService } from 'src/app/services/company.service';
import { CountryListService } from 'src/app/services/country-list.service';
import { DealService } from 'src/app/services/deal.service';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-existing-company-conversion',
  templateUrl: './existing-company-conversion.component.html',
  styleUrls: ['./existing-company-conversion.component.scss'],
})
export class ExistingCompanyConversionComponent implements OnInit {
  @select((s) => s.company.companyList) companyList$: any;
  @select((s) => s.company.companyDetails) companyDetails$: any;
  CompanyInformationForm!: FormGroup;
  LocationList!: Country[];
  secondFormGroup!: FormGroup;
  firstFormGroup!: FormGroup;
  isphoneNumberError: boolean = false;
  isContactPhoneNumberError!: boolean;
  StepOneFormData!: null;
  imgUrl: any;
  isSelected!: boolean;
  uploadedImage: any;
  subscriptions: Subscription[] = [];
  CompanyLogoLabel = 'Upload Company Logo';
  leadId!: any;
  CompanySelector: any;
  isExistingCompany = true;
  logoImgSrc = '';
  companyId: any;
  contactFormDetailsFormData: any;
  //
  PhoneNumber: any;
  uploadCompanyLogoError!: string;
  isDoneUploadingImage!: boolean;
  ContactPhoneNumber: any;
  isSending = false;
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
  ) { }

  ngOnInit(): void {
    this.onGetLocation();
    this.buildForm();
    this.onGetLeadId();
    this._companySvc.LoadCompanyList();
  }

  buildForm() {
    this.CompanyInformationForm = this._fb.group({
      CompanyName: '',
      CompanyEmail: '',
      PhoneNumber: '',
      Address: '',
      Location: '',
      CompanySize: '',
      Website: '',
      VATReistration: '',
      Description: '',
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
        // console.log('_leadId!!!: ', _leadId);
        let _companyId = param.get('companyId');
        this.companyId = _companyId;
        // console.log('_companyId!!!: ', _companyId);
        this.getCompanyDetails(this.companyId);
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  getCompanyDetails(companyId: string) {
    let subscription = this._companySvc.getCompanyDetails(companyId).subscribe({
      next: (response: any) => {
        if (response) {
          if (response.ResponseCode == '00') {
            let companyDetails = response.Data;
            this.onPrefillFormWithCompanyDetails(companyDetails);
          }
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onPrefillFormWithCompanyDetails(Company: any) {
    if (Company) {
      this.CompanyInformationForm.controls['CompanyName'].setValue(
        Company?.Name
      );
      this.CompanyInformationForm.controls['CompanyEmail'].setValue(
        Company?.EmailAddress
      );
      this.CompanyInformationForm.controls['Address'].setValue(
        Company?.Address
      );
      this.CompanyInformationForm.controls['Location'].setValue(
        Company?.Location
      );
      this.CompanyInformationForm.controls['CompanySize'].setValue(
        Company?.Size
      );
      this.CompanyInformationForm.controls['Website'].setValue(
        Company?.Website
      );
      this.CompanyInformationForm.controls['Description'].setValue(
        Company?.Description
      );
      this.CompanyInformationForm.controls['PhoneNumber'].setValue(
        Company?.PhoneNumber
      );
      this.CompanyInformationForm.controls['VATReistration'].setValue(
        Company?.VATReistration
      );
      this.logoImgSrc = Company?.LogoUrl;
      this.companyId = Company?.CompanyId;
      this.uploadedImage = Company?.LogoUrl;
    }
  }

  onSubmitCompanyInfoForm() {
    const Payload: any = {
      LeadId: this.leadId,
      CompanyId: this.companyId
    };
    console.log('Payload: ', Payload);
    this.convertLeadToDeal(Payload);
  }


  validatePhoneNumber(PhoneNumber: any): boolean | any {
    let x = new ValidateNgxIntlTelInput(PhoneNumber, false);
    return x.check();
  }

  convertLeadToDeal(Payload: ConvertCompanyLeadToDeal) {
    this.isSending = true;
    let subscription = this._dealSvc
      .ConvertCompanyLeadToDeal(Payload)
      .subscribe({
        next: (response: any) => {
          // console.log('response: ', response);
          this.isSending = false;
          if (response) {
            // this.toastr.success(response?.ResponseMessage);
            this.toastr.success('Conversion successful');
            this.CompanyInformationForm.reset();
            this._router.navigate(['/recruiter/crm/leads']);
          }
        },
        error: (err: any) => {
          if (err) {
            console.warn('Error: ', err);
            this.toastr.error("Conversion failed. Try again!")
            this.isSending = false;
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
