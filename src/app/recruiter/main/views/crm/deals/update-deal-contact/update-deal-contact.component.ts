import { NgRedux, select } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidateNgxIntlTelInput } from 'src/app/models/classes/validate-ngx-intl-tel-input';
import { UpdateDealContact } from 'src/app/models/types/deal';
import { ContactListService } from 'src/app/services/contact-list.service';
import { DealService } from 'src/app/services/deal.service';
import { IAppState } from 'src/STORE/store';
import {
  REMOVE_DEAL_SECONDARY_CONTACT,
  REMOVE_DEAL_SECONDARY_CONTACT_ERROR,
  REMOVE_DEAL_SECONDARY_CONTACT_SUCCESS,
  UPDATE_DEAL_SECONDARY_CONTACT,
  UPDATE_DEAL_SECONDARY_CONTACT_ERROR,
  UPDATE_DEAL_SECONDARY_CONTACT_SUCCESS,
} from 'src/STORE/_deal.store/deal.actions';
import { REMOVE_DEAL_CONTACT, REMOVE_DEAL_CONTACT_ERROR, REMOVE_DEAL_CONTACT_SUCCESS, UPDATE_DEAL_CONTACT, UPDATE_DEAL_CONTACT_ERROR, UPDATE_DEAL_CONTACT_SUCCESS } from 'src/STORE/_dealContact.store/dealContact.actions';

@Component({
  selector: 'app-update-deal-contact',
  templateUrl: './update-deal-contact.component.html',
  styleUrls: ['./update-deal-contact.component.scss'],
})
export class UpdateDealContactComponent implements OnInit {
  @Output() triggerUpdateForm: EventEmitter<boolean> = new EventEmitter();
  @Input('dealDetails') dealDetails: any;
  @select((s) => s.deals.isLoading) isLoading$: any;
  dealContactDetails: any;
  UpdateDealContactForm!: FormGroup;
  dealId: any;
  loaderText = 'Updating...';
  isphoneNumberError: any;
  isUpdating: boolean = false
  constructor(
    private _fb: FormBuilder,
    private _dealSvc: DealService,
    private _contactListSvc: ContactListService,
    private _route: ActivatedRoute,
    private ngRedux: NgRedux<IAppState>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.buildForm();
    this._dealSvc.DealContactBehaviorSubjectData.subscribe({
      next: (data: any) => {
        if (data) {
          this.dealContactDetails = data;
          this.prefillFormData(data);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }

  buildForm() {
    this.UpdateDealContactForm = this._fb.group({
      ContactId: '',
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      EmailAddress: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required]],
    });
  }
  onCloseUpdateDealContactForm() {
    this.triggerUpdateForm.emit(false);
  }

  prefillFormData(DealContact: UpdateDealContact) {
    console.warn('DealContact: ', DealContact);
    this.UpdateDealContactForm.controls['FirstName'].setValue(
      DealContact?.FirstName
    );
    this.UpdateDealContactForm.controls['LastName'].setValue(
      DealContact?.LastName
    );
    this.UpdateDealContactForm.controls['EmailAddress'].setValue(
      DealContact?.EmailAddress
    );
    this.UpdateDealContactForm.controls['PhoneNumber'].setValue(
      DealContact?.PhoneNumber
    );
    this.UpdateDealContactForm.controls['ContactId'].setValue(DealContact?.Id);
  }


  validatePhoneNumber(PhoneNumber: any): boolean | any {
    let x = new ValidateNgxIntlTelInput(PhoneNumber, false);
    return x.check();
  }


  onSubmit() {
    const Payload: UpdateDealContact = {
      Id: this.UpdateDealContactForm.value.ContactId,
      FirstName: this.UpdateDealContactForm.value.FirstName,
      LastName: this.UpdateDealContactForm.value.LastName,
      EmailAddress: this.UpdateDealContactForm.value.EmailAddress,
      PhoneNumber:
        this.UpdateDealContactForm.value.PhoneNumber
          ?.internationalNumber,
    };


    this.isphoneNumberError = this.validatePhoneNumber(
      Payload.PhoneNumber
    );


    if (!this.isphoneNumberError || this.UpdateDealContactForm.invalid) {
      this.updateContactInfomation(Payload, this.dealDetails?.Id);
    }
  }

  updateContactInfomation(Payload: UpdateDealContact, DealId: string) {
    this.isUpdating = true;
    this.ngRedux.dispatch({ type: UPDATE_DEAL_CONTACT });
    this._dealSvc.UpdateContact(DealId, Payload).subscribe({
      next: (response: any) => {
        if (response) {
          this.isUpdating = false;
          this.toastr.success(response?.ResponseMessage)
          this.ngRedux.dispatch({
            type: UPDATE_DEAL_CONTACT_SUCCESS,
            payload: Payload,
          });
          this.onCloseUpdateDealContactForm();
        }
      },
      error: (err: any) => {
        if (err) {
          this.isUpdating = false;
          console.warn('Error: ', err);
          this.toastr.error(err?.statusText)
          this.ngRedux.dispatch({
            type: UPDATE_DEAL_CONTACT_ERROR,
            payload: err,
          });
        }
      },
    });
  }

  removeContact(dealContactDetails: any) {

    // let confirmation = confirm('Are you sure you want to delete this contact?');
    // if (!confirmation) {
    //   return;
    // }
    this.ngRedux.dispatch({ type: REMOVE_DEAL_CONTACT });
    this._contactListSvc.RemoveContact(dealContactDetails?.Id).subscribe({
      next: (response: any) => {
        if (response) {
          this.ngRedux.dispatch({
            type: REMOVE_DEAL_CONTACT_SUCCESS,
            payload: dealContactDetails?.Id,
          });
          this.onCloseUpdateDealContactForm();
        }
      },
      error: (err: any) => {
        if (err) {
          console.log("Error: ", err)
          this.ngRedux.dispatch({
            type: REMOVE_DEAL_CONTACT_ERROR,
            payload: err,
          });
        }
      },
    });
  }
}
