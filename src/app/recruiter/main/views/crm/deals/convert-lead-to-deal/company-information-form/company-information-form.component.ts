import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/types/country';
import { CertificationService } from 'src/app/services/certification.service';
import { CountryListService } from 'src/app/services/country-list.service';

@Component({
  selector: 'app-company-information-form',
  templateUrl: './company-information-form.component.html',
  styleUrls: ['./company-information-form.component.scss']
})
export class CompanyInformationFormComponent implements OnInit {
  CompanyInformationForm!: FormGroup;
  LocationList!: Country[];
  isphoneNumberError!: boolean;
  // 
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
  // companyId: any;
  // companyFormData: any;
  // contactFormDetailsFormData: any;
  PhoneNumber: any;
  constructor(private _fb: FormBuilder,
    private _LocationSvc: CountryListService,
    private _certificationSvc: CertificationService,) { }

  ngOnInit(): void {
    this.buildForm()
    this.onGetLocation()
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
      // CompanyLogo: '',
    });
  }
  onGetLocation() {
    this.LocationList = this._LocationSvc.getCountryList();
  }

  validatePhoneNumber(PhoneNumber: any, isBoolean: boolean): boolean | any {
    if (PhoneNumber === null) {
      isBoolean = true;
      return isBoolean;
    }
    if (isBoolean) {
      isBoolean = false;
      return isBoolean;
    }
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

        const formData = new FormData();
        formData.append('UploadFile', this.rawImg);

        let subscription = this._certificationSvc
          .uploadCertificationFile(formData)
          .subscribe({
            next: (response: any) => {
              console.log(response);
              if (response) {
                console.log(response[0].AbsoluteUrl);
                this.uploadedImage = response[0].AbsoluteUrl;
                localStorage.setItem(
                  'uploadedResumeFile',
                  JSON.stringify(this.uploadedImage)
                );
              }
            },
            error: (err: any) => {
              console.warn('Error: ', err);
            },
          });
        this.subscriptions.push(subscription);
      };
    }
  }

  onSubmitCompanyInfoForm() {
    console.log("this.CompanyInformationForm: ", this.CompanyInformationForm.value)
    const CompanyInformation = { ...this.CompanyInformationForm.value, PhoneNumber: this.PhoneNumber.internationalNumber }
    console.log("CompanyInformation: ", CompanyInformation)
  }
}
