import { NgRedux } from '@angular-redux/store';
import {
  AfterContentChecked,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CertificationService } from 'src/app/services/certification.service';
import { DealService } from 'src/app/services/deal.service';
import { IdentityService } from 'src/app/services/identity.service';
import { IAppState } from 'src/STORE/store';
import {
  UPDATE_DEAL,
  UPDATE_DEAL_ERROR,
  UPDATE_DEAL_SUCCESS,
} from 'src/STORE/_deal.store/deal.actions';
import { tassign } from 'tassign';

@Component({
  selector: 'app-update-deal',
  templateUrl: './update-deal.component.html',
  styleUrls: ['./update-deal.component.scss'],
})
export class UpdateDealComponent implements OnInit, OnDestroy {
  @Input() dealDetails: any;
  brandLogo = '../../../../../../../assets/images/zart-brand-logo.png';
  UpdateDealForm!: FormGroup;
  logoImgSrc = '';
  CompanyLogoLabel = 'Upload Company Logo';
  Subscriptions: Subscription[] = [];
  isNewImageUploaded: any;
  constructor(
    private _fb: FormBuilder,
    private _identitySvc: IdentityService,
    private _certificationSvc: CertificationService,
    private _dealSvc: DealService,
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit(): void {
    console.log('dealDetails: ', this.dealDetails);
    this.buildForm();
    this.onPrefillForm(this.dealDetails);
  }

  buildForm() {
    this.UpdateDealForm = this._fb.group({
      CompanyName: '',
      CompanyAddress: '',
      CompanyEmailAddress: '',
      CompanyPhoneNumber: '',
      CompanyWebsite: '',
      CompanyLocation: '',
      CompanySize: '',
      CompanyVAT: '',
      CompanyDescription: '',
    });
  }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
  }

  rawImg: any;
  imgUrl: any;
  uploadedFile: any;
  isSelected!: boolean;
  uploadedImage: any;

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

  onPrefillForm(DealDetails: any) {
    this.UpdateDealForm.controls['CompanyName'].setValue(
      DealDetails?.Companies?.Name
    );
    this.UpdateDealForm.controls['CompanyAddress'].setValue(
      DealDetails?.Companies?.Address
    );
    this.UpdateDealForm.controls['CompanyEmailAddress'].setValue(
      DealDetails?.Companies?.EmailAddress
    );
    this.UpdateDealForm.controls['CompanyPhoneNumber'].setValue(
      DealDetails?.Companies?.PhoneNumber
    );
    this.UpdateDealForm.controls['CompanyWebsite'].setValue(
      DealDetails?.Companies?.Website
    );
    this.UpdateDealForm.controls['CompanyLocation'].setValue(
      DealDetails?.Companies?.Location
    );
    this.UpdateDealForm.controls['CompanySize'].setValue(
      DealDetails?.Companies?.Size
    );
    this.UpdateDealForm.controls['CompanyVAT'].setValue(
      DealDetails?.Companies?.VATReistration
    );
    this.UpdateDealForm.controls['CompanyDescription'].setValue(
      DealDetails?.Companies?.Description
    );
    this.brandLogo = DealDetails?.Companies?.LogoUrl;
  }

  onSubmit() {
    if (this.isNewImageUploaded) {
      this.brandLogo = this.uploadedImage;
    }
    // console.log('this.brandLogo_A: ', this.brandLogo);
    // console.log('UpdateDealForm: ', this.UpdateDealForm.value);
    // console.log('this.brandLogo_B: ', this.brandLogo);
    // console.log('this.uploadedImage: ', this.uploadedImage);
    const formData = {
      Companies: {
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
      },
    };
    //
    let x = tassign({}, this.dealDetails, formData);
    
    this.updateDealPrimaryContact(x);
    // let subscription = this._dealSvc
    //   .UpdateDeal(x, this.dealDetails.Id)
    //   .subscribe({
    //     next: (response: any) => {
    //       if (response) {
    //         
    //       }
    //     },
    //     error: (err: any) => {
    //       if (err) {
    //         console.warn('Error: ', err);
    //       }
    //     },
    //   });
    // this.Subscriptions.push(subscription);
  }

  updateDealPrimaryContact(Payload: any) {
    this.ngRedux.dispatch({ type: UPDATE_DEAL });
    let subscription = this._dealSvc
      .UpdateDeal(Payload, this.dealDetails.Id)
      .subscribe({
        next: (response: any) => {
          if (response) {
            
            this.ngRedux.dispatch({
              type: UPDATE_DEAL_SUCCESS,
              payload: Payload,
            });
          }
        },
        error: (err: any) => {
          if (err) {
            console.warn('Error: ', err);
            this.ngRedux.dispatch({ type: UPDATE_DEAL_ERROR, payload: err });
          }
        },
      });
    this.Subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
