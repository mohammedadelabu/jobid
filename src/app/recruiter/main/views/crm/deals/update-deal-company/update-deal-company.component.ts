import { NgRedux, select } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidateNgxIntlTelInput } from 'src/app/models/classes/validate-ngx-intl-tel-input';
import { CertificationService } from 'src/app/services/certification.service';
import { CompanyService } from 'src/app/services/company.service';
import { DealService } from 'src/app/services/deal.service';
import { IdentityService } from 'src/app/services/identity.service';
import { IAppState } from 'src/STORE/store';
import {
  UPDATE_COMPANY,
  UPDATE_COMPANY_ERROR,
  UPDATE_COMPANY_SUCCESS,
} from 'src/STORE/_company.store/company.actions';
import {
  UPDATE_DEAL,
  UPDATE_DEAL_COMPANY_DETAILS,
  UPDATE_DEAL_COMPANY_DETAILS_ERROR,
  UPDATE_DEAL_COMPANY_DETAILS_SUCCESS,
  UPDATE_DEAL_ERROR,
  UPDATE_DEAL_SUCCESS,
} from 'src/STORE/_deal.store/deal.actions';

@Component({
  selector: 'app-update-deal-company',
  templateUrl: './update-deal-company.component.html',
  styleUrls: ['./update-deal-company.component.scss'],
})
export class UpdateDealCompanyComponent implements OnInit {
  @Input() dealDetails: any;
  @Input() dealCompanyDetails: any;
  @Output() closeUpdateDealCompanyForm = new EventEmitter();
  @Output() onCloseUpdateDealCompany = new EventEmitter();
  @select((s) => s.deals.isLoading) isLoading$: any;

  brandLogo = '../../../../../../../assets/images/zart-brand-logo.png';
  UpdateDealForm!: FormGroup;
  logoImgSrc = '';
  CompanyLogoLabel = 'Upload Company Logo';
  Subscriptions: Subscription[] = [];
  isNewImageUploaded: any;
  rawImg: any;
  imgUrl: any;
  uploadedFile: any;
  isSelected!: boolean;
  uploadedImage: any;
  isphoneNumberError: any;

  constructor(
    private _fb: FormBuilder,
    private _certificationSvc: CertificationService,
    private _identitySvc: IdentityService,
    private _dealSvc: DealService,
    private _companySvc: CompanyService,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit(): void {
    // console.log('dealDetails: ', this.dealCompanyDetails);
    this.buildForm();
    this.onPrefillForm(this.dealCompanyDetails);
  }

  buildForm() {
    this.UpdateDealForm = this._fb.group({
      CompanyName: ['', [Validators.required]],
      CompanyAddress: '',
      CompanyEmailAddress: ['', [Validators.required, Validators.email]],
      CompanyPhoneNumber: ['', [Validators.required]],
      CompanyWebsite: '',
      CompanyLocation: '',
      CompanySize: '',
      CompanyVAT: ['', [Validators.required]],
      CompanyDescription: '',
    });
  }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    return updatedBy;
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

              // console.log(response[0].AbsoluteUrl);
              this.uploadedImage = response[0].AbsoluteUrl;
              if (this.uploadedImage) {
                this.isNewImageUploaded = true;
              }
            },
            error: (err: any) => {
              console.warn('Error: ', err);
            },
          });
        this.Subscriptions.push(subscription);
      };
    }
  }

  oncloseUpdateDealCompanyForm() {
    this.closeUpdateDealCompanyForm.emit(false);
  }

  onPrefillForm(Company: any) {
    this.UpdateDealForm.controls['CompanyName'].setValue(Company.Name);
    this.UpdateDealForm.controls['CompanyAddress'].setValue(Company.Address);
    this.UpdateDealForm.controls['CompanyEmailAddress'].setValue(
      Company.EmailAddress
    );
    this.UpdateDealForm.controls['CompanyPhoneNumber'].setValue(
      Company.PhoneNumber
    );
    this.UpdateDealForm.controls['CompanyWebsite'].setValue(Company.Website);
    this.UpdateDealForm.controls['CompanyLocation'].setValue(Company.Location);
    this.UpdateDealForm.controls['CompanySize'].setValue(Company.Size);
    this.UpdateDealForm.controls['CompanyVAT'].setValue(Company.VATReistration);
    this.UpdateDealForm.controls['CompanyDescription'].setValue(
      Company.Description
    );
    this.brandLogo = Company.LogoUrl;
  }

  validatePhoneNumber(PhoneNumber: any): boolean | any {
    let x = new ValidateNgxIntlTelInput(PhoneNumber, false);
    return x.check();
  }


  onSubmit() {
    this.isphoneNumberError = this.validatePhoneNumber(
      this.UpdateDealForm.value.CompanyPhoneNumber?.internationalNumber
    );
    if (this.isNewImageUploaded) {
      this.brandLogo = this.uploadedImage;
    }
    // console.log('this.brandLogo_A: ', this.brandLogo);
    // console.log('UpdateDealForm: ', this.UpdateDealForm.value);
    // console.log('this.brandLogo_B: ', this.brandLogo);
    // console.log('this.uploadedImage: ', this.uploadedImage);
    const formData = {
      Name: this.UpdateDealForm.value.CompanyName,
      PhoneNumber:
        this.UpdateDealForm.value.CompanyPhoneNumber?.internationalNumber,
      Address: this.UpdateDealForm.value.CompanyAddress,
      Description: this.UpdateDealForm.value.CompanyDescription,
      Location: this.UpdateDealForm.value.CompanyLocation,
      Size: this.UpdateDealForm.value.CompanySize,
      Website: this.UpdateDealForm.value.CompanyWebsite,
      VATReistration: this.UpdateDealForm.value.CompanyVAT,
      EmailAddress: this.UpdateDealForm.value.CompanyEmailAddress,
      LogoUrl: this.brandLogo,
      UpdatedBy: this.onGetUpdatedBy(),
      InviteCompany: false,
    };
    //
    // let x = tassign({}, this.dealDetails, formData);
    // console.log('x: ', formData);
    if (this.isphoneNumberError || this.UpdateDealForm.invalid) {
      return;
    } else {
      this.updateDealCompany(formData);
    }
  }

  updateDealCompany(Payload: any) {
    // console.log('this.dealDetails: ', this.dealCompanyDetails);
    this.ngRedux.dispatch({ type: UPDATE_DEAL });
    // this.ngRedux.dispatch({ type: UPDATE_COMPANY });
    this.ngRedux.dispatch({ type: UPDATE_DEAL_COMPANY_DETAILS });
    let subscription = this._companySvc
      .updateCompany(Payload, this.dealCompanyDetails.CompanyId)
      .subscribe({
        next: (response: any) => {
          if (response) {

            this.ngRedux.dispatch({
              type: UPDATE_DEAL_SUCCESS,
              payload: Payload,
            });
            // this.ngRedux.dispatch({
            //   type: UPDATE_COMPANY_SUCCESS,
            //   payload: Payload,
            // });
            const newPayload = { ...Payload, CompanyId: this.dealCompanyDetails.CompanyId }
            this.ngRedux.dispatch({
              type: UPDATE_DEAL_COMPANY_DETAILS_SUCCESS,
              payload: newPayload,
            });
            this.oncloseUpdateDealCompanyForm();
          }
        },
        error: (err: any) => {
          if (err) {
            console.warn('Error: ', err);
            // this.ngRedux.dispatch({ type: UPDATE_COMPANY_ERROR, payload: err });
            this.ngRedux.dispatch({
              type: UPDATE_DEAL_ERROR,
              payload: err,
            });
            this.ngRedux.dispatch({
              type: UPDATE_DEAL_COMPANY_DETAILS_ERROR,
              payload: err,
            });
          }
        },
      });
    this.Subscriptions.push(subscription);
  }


  onCloseForm() {
    this.onCloseUpdateDealCompany.emit()
  }


  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
