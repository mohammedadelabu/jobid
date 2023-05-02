import { NgRedux, select } from '@angular-redux/store';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ValidateNgxIntlTelInput } from 'src/app/models/classes/validate-ngx-intl-tel-input';
import { DealService } from 'src/app/services/deal.service';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_DEAL_PRIMARY_CONTACT_DETAILS_SUCCESS,
  UPDATE_DEAL,
  UPDATE_DEAL_ERROR,
  UPDATE_DEAL_SUCCESS,
} from 'src/STORE/_deal.store/deal.actions';
import { tassign } from 'tassign';

@Component({
  selector: 'app-update-deal-primary-contact',
  templateUrl: './update-deal-primary-contact.component.html',
  styleUrls: ['./update-deal-primary-contact.component.scss'],
})
export class UpdateDealPrimaryContactComponent implements OnInit, OnDestroy {
  @Output() triggerUpdateForm: EventEmitter<boolean> = new EventEmitter();
  @select((s) => s.deals.dealDetails) dealDetails$: any;
  @select((s) => s.deals.dealPrimaryContactDetails)
  dealPrimaryContactDetails$: any;

  @select((s) => s.deals.isLoading) isLoading$: any;

  UpdateDealContactForm!: FormGroup;
  Subscriptions: Subscription[] = [];
  dealDetails: any;
  isphoneNumberError: any;
  isUpdating = false

  constructor(
    private _fb: FormBuilder,
    private _dealSvc: DealService,
    private _route: ActivatedRoute,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit(): void {
    this.buildForm();
    // this.getParams();

    this.dealPrimaryContactDetails$.subscribe({
      next: (details: any) => {
        console.log('dealPrimaryContactDetails: ', details);
        this.prefillForm(details);
      },
    });

    this.dealDetails$.subscribe({
      next: (details: any) => {
        console.log('dealDetails: ', details);
        console.log('dealId: ', details?.Id);
        this.dealDetails = details;
      },
    });
  }
  buildForm() {
    this.UpdateDealContactForm = this._fb.group({
      ContactEmail: '',
      ContactFirstName: '',
      ContactLastName: '',
      ContactPhoneNumber: '',
    });
  }

  // getParams() {
  //   let subscription = this._route.paramMap.subscribe({
  //     next: (params: any) => {
  //       if (params) {
  //         
  //         let dealId = params.get('dealId');
  //         console.log('params dealId ', dealId);
  //         this.onGetDealDetails(dealId);
  //       }
  //     },
  //     error: (err: any) => {
  //       
  //     },
  //   });
  //   this.Subscriptions.push(subscription);
  // }

  // onGetDealDetails(DealId: string) {
  //   this._dealSvc.GetDealDetails(DealId);
  // }

  prefillForm(dealPrimaryContactDetails: any) {
    this.UpdateDealContactForm.controls['ContactEmail'].setValue(
      dealPrimaryContactDetails.ContactEmail
    );
    this.UpdateDealContactForm.controls['ContactFirstName'].setValue(
      dealPrimaryContactDetails.ContactFirstName
    );
    this.UpdateDealContactForm.controls['ContactLastName'].setValue(
      dealPrimaryContactDetails.ContactLastName
    );
    this.UpdateDealContactForm.controls['ContactPhoneNumber'].setValue(
      dealPrimaryContactDetails.ContactPhoneNumber
    );
  }

  onCloseUpdateDealContactForm() {
    this.triggerUpdateForm.emit(false);
  }

  validatePhoneNumber(PhoneNumber: any): boolean | any {
    let x = new ValidateNgxIntlTelInput(PhoneNumber, false);
    return x.check();
  }
  onSubmit() {
    console.log(
      'this.UpdateDealContactForm: ',
      this.UpdateDealContactForm.value
    );

    const formData = {
      LeadId: this.dealDetails.LeadId,
      CompanyId: this.dealDetails.CompanyId,
      ContactEmail: this.UpdateDealContactForm.value.ContactEmail,
      ContactFirstName: this.UpdateDealContactForm.value.ContactFirstName,
      ContactLastName: this.UpdateDealContactForm.value.ContactLastName,
      ContactPhoneNumber:
        this.UpdateDealContactForm.value.ContactPhoneNumber
          ?.internationalNumber,
    };


    this.isphoneNumberError = this.validatePhoneNumber(
      formData.ContactPhoneNumber
    );


    // let x = tassign({}, this.dealDetails, formData);
    // 
    // this. updateDealPrimaryContact(x);
    // console.log('(formData): ', formData);
    if (!this.isphoneNumberError || this.UpdateDealContactForm.invalid) {
      this.updateDealPrimaryContact(formData);
    }
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
            const PrimaryContactDetails = {
              ContactEmail: Payload.ContactEmail,
              ContactFirstName: Payload.ContactFirstName,
              ContactLastName: Payload.ContactLastName,
              ContactPhoneNumber: Payload.ContactPhoneNumber,
            };
            this.ngRedux.dispatch({
              type: FETCH_DEAL_PRIMARY_CONTACT_DETAILS_SUCCESS,
              payload: PrimaryContactDetails,
            });
            this.onCloseUpdateDealContactForm();
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
