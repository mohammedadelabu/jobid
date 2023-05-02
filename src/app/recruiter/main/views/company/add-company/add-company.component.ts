import { NgRedux, select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ValidateNgxIntlTelInput } from 'src/app/models/classes/validate-ngx-intl-tel-input';
import { AddCompany } from 'src/app/models/types/company';
import { Country } from 'src/app/models/types/country';
import { CertificationService } from 'src/app/services/certification.service';
import { CompanyService } from 'src/app/services/company.service';
import { CountryListService } from 'src/app/services/country-list.service';
import { IdentityService } from 'src/app/services/identity.service';
import { IAppState } from 'src/STORE/store';
import {
  ADD_COMPANY,
  ADD_COMPANY_ERROR,
  ADD_COMPANY_SUCCESS,
} from 'src/STORE/_company.store/company.actions';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
})
export class AddCompanyComponent implements OnInit, OnDestroy {
  @select((s) => s.company.isLoading) isCompanyListLoading$: any;
  AddCompanyForm!: FormGroup;
  countryList!: Country[];
  CompanyLogoLabel = 'Upload Company Logo';
  rawImg: any;
  imgUrl: any;
  isSelected: boolean = false;
  uploadedFile!: any;
  UserImage: any;
  loggedInUser: any;
  newCompanyId: any;
  isphoneNumberError = false;
  subscriptions: Subscription[] = [];
  isDoneUploadingImage!: boolean;
  uploadedImage: any;
  uploadCompanyLogoError!: string;
  PhoneNumber: any;
  isLoading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _countryListSvc: CountryListService,
    private _companySvc: CompanyService,
    private _router: Router,
    private _certificationSvc: CertificationService,
    private _identitySvc: IdentityService,
    private ngRedux: NgRedux<IAppState>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.onGetCountryList();
    this.buildForm();
    this.updatedBy();
  }

  buildForm() {
    this.AddCompanyForm = this._fb.group({
      CompanyName: ['', [Validators.required]],
      EmailAddress: ['', [Validators.email]],
      Address: '',
      Location: '',
      CompanySize: '',
      Website: '',
      VATRegistration: [''],
      CompanyLogo: '',
      Description: '',
      InviteCompany: false,
    });
    return this.AddCompanyForm;
  }

  updatedBy() {
    this.loggedInUser = this._identitySvc.getLoggedInUserData().Id;
    // console.log('this.loggedInUser: ', this.loggedInUser);
  }

  onGetCountryList() {
    this.countryList = this._countryListSvc.getCountryList();
  }

  onSelectFile(e: any) {
    if (e.target.files) {
      const reader = new FileReader();
      this.rawImg = e.target.files[0];
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
        this.uploadedFile = e.target.files[0];
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
          // console.log('response: ', response);
          this.uploadedImage = response[0].AbsoluteUrl;
          // console.log('this.uploadedImage: ', this.uploadedImage);
          this.isDoneUploadingImage = false;
        },
        error: (err: any) => {
          console.warn(err);
          this.uploadCompanyLogoError = `${err?.statusText}: Something went wrong. Please try again!`;
        },
      });
    this.subscriptions.push(subscription);
  }

  validatePhoneNumber(PhoneNumber: any, isBoolean: boolean): boolean | any {
    let x = new ValidateNgxIntlTelInput(PhoneNumber, isBoolean);
    return x.check();
  }

  onSubmit() {
    let pVat = this.AddCompanyForm.value.VATRegistration;
    let pEmail = this.AddCompanyForm.value.EmailAddress;
    let pPhone = this.PhoneNumber?.internationalNumber;
    let pLogo = this.uploadedImage;
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

    const data: any = {
      Name: this.AddCompanyForm.value.CompanyName,
      ContactDetails: this.AddCompanyForm.value.EmailAddress,
      EmailAddress: pEmail,
      Address: this.AddCompanyForm.value.Address,
      Location: this.AddCompanyForm.value.Location,
      Size: this.AddCompanyForm.value.CompanySize,
      Website: this.AddCompanyForm.value.Website,
      VATReistration: pVat,
      Description: this.AddCompanyForm.value.Description,
      InviteCompany: this.AddCompanyForm.value.InviteCompany,
    };
    const Payload: AddCompany = {
      ...data,
      LogoUrl: pLogo,
      UpdatedBy: this.loggedInUser,
      PhoneNumber: pPhone,
    };
    console.log('Payload: ', Payload);

    // console.log('AddCompanyForm: ', this.AddCompanyForm.value);
    // console.log('AddCompanyForm Payload: ', Payload);

    // this.isphoneNumberError = this.validatePhoneNumber(
    //   Payload.PhoneNumber,
    //   false
    // );

    // if (!this.isphoneNumberError) {
      this.AddCompany(Payload);
    // }
  }

  AddCompany(Company: AddCompany) {

    let pVat = Company?.VATReistration;
    let pEmail = Company?.EmailAddress;
    let pPhone = Company?.PhoneNumber;
    let pLogo = Company?.LogoUrl;

    console.log(Company);


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
    this.isLoading = true;
    // this.ngRedux.dispatch({ type: ADD_COMPANY });
    let subscription = this._companySvc.addCompany(Company).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response) {
          if (response.ResponseCode == '400') {
            let successMessage = response?.ResponseMessage;
            this.toastr.error(successMessage);
            return;
          }

          if (response.ResponseCode == '500') {
            let successMessage = response?.ResponseMessage;
            this.toastr.error(successMessage);
          }

          const newCompanyItem = {
            Name: Company?.Name,
            // PhoneNumber: Company?.PhoneNumber,
            PhoneNumber: pPhone,
            Address: Company?.Address,
            Description: Company?.Description,
            Location: Company?.Location,
            Size: Company?.Size,
            Website: Company?.Website,
            VATReistration: pVat,
            EmailAddress: pEmail,
            LogoUrl: pLogo,
          };
          if (response?.ResponseCode == '200') {
            let successMessage = response?.ResponseMessage;
            this.ngRedux.dispatch({
              type: ADD_COMPANY_SUCCESS,
              payload: newCompanyItem,
            });
            this._router.navigate(['/recruiter/crm/companies']);
            this.toastr.success(successMessage);
            this.AddCompanyForm.reset();
          }
          // this._router.navigate([
          //   `/recruiter/crm/companies/company-details/${this.newCompanyId}`,
          // ]);
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        console.warn('Error: ', err);
        this.toastr.error('Failed, try again!');
        this.ngRedux.dispatch({ type: ADD_COMPANY_ERROR, payload: err });
      },
    });
    this.subscriptions.push(subscription);
  }

  // contactDetails(contacts: any[]) {
  //   let newList: any = [];
  //   contacts.forEach((contact: any) => {
  //     let data = {
  //       ContactFirstName: contact.ContactFirstName,
  //       ContactLastName: contact.ContactLastName,
  //       ContactEmail: contact.ContactEmail,
  //       ContactMobileNumber: contact.ContactMobileNumber?.internationalNumber,
  //     };
  //     newList.push(data);
  //   });
  //   return newList;
  // }

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
