import { NgRedux, select } from '@angular-redux/store';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ValidateNgxIntlTelInput } from 'src/app/models/classes/validate-ngx-intl-tel-input';
import { AddIdentifiedContact } from 'src/app/models/types/contact';
import { ContactService } from 'src/app/services/contact.service';
import { DealService } from 'src/app/services/deal.service';
import { IAppState } from 'src/STORE/store';
import {
  ADD_DEAL_SECONDARY_CONTACT,
  ADD_DEAL_SECONDARY_CONTACT_ERROR,
  ADD_DEAL_SECONDARY_CONTACT_SUCCESS,
} from 'src/STORE/_deal.store/deal.actions';
import { ADD_DEAL_CONTACT, ADD_DEAL_CONTACT_ERROR, ADD_DEAL_CONTACT_SUCCESS } from 'src/STORE/_dealContact.store/dealContact.actions';

@Component({
  selector: 'app-add-deal-contact',
  templateUrl: './add-deal-contact.component.html',
  styleUrls: ['./add-deal-contact.component.scss'],
})
export class AddDealContactComponent implements OnInit, OnDestroy {
  @Output() triggerAddForm: EventEmitter<boolean> = new EventEmitter();
  @Input() dealDetails!: any;
  @select((s) => s.deals.isLoading) isLoading$: any;
  AddDealContactForm!: FormGroup;
  Subscriptions: Subscription[] = [];
  isphoneNumberError: any;
  isSending: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddDealContactComponent>,
    private _fb: FormBuilder,
    private _dealSvc: DealService,
    @Inject(MAT_DIALOG_DATA) public data: { dealDetails: any },
    private ngRedux: NgRedux<IAppState>,
    private toastr: ToastrService,
    private _contactSvc: ContactService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    console.log('dealId: ', this.data);
    console.log(this.data?.dealDetails?.Id);
  }

  buildForm() {
    this.AddDealContactForm = this._fb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      EmailAddress: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required]],
    });
  }

  onCloseAddDealContactForm() {
    this.triggerAddForm.emit(false);
  }

  validatePhoneNumber(PhoneNumber: any): boolean | any {
    let x = new ValidateNgxIntlTelInput(PhoneNumber, false);
    return x.check();
  }

  onSubmit() {
    this.ngRedux.dispatch({ type: ADD_DEAL_SECONDARY_CONTACT });
    console.log('AddDealContactForm: ', this.AddDealContactForm.value);
    // const Payload = {
    //   FirstName: this.AddDealContactForm.value.FirstName,
    //   LastName: this.AddDealContactForm.value.LastName,
    //   EmailAddress: this.AddDealContactForm.value.EmailAddress,
    //   PhoneNumber: this.AddDealContactForm.value.PhoneNumber?.internationalNumber,
    // };

    // this.isphoneNumberError = this.validatePhoneNumber(
    //   Payload.PhoneNumber
    // );

    // if (!this.isphoneNumberError || this.AddDealContactForm.invalid) {
    //   this.AddDealContact(this.data?.dealDetails?.Id, Payload);
    // }

    const Payload: AddIdentifiedContact = {
      FirstName: this.AddDealContactForm.value.FirstName,
      LastName: this.AddDealContactForm.value.LastName,
      CompanyName: `${this.data.dealDetails.Companies?.Name}`,
      EmailAddress: this.AddDealContactForm.value.EmailAddress,
      PhoneNumber:
        this.AddDealContactForm.value.PhoneNumber?.internationalNumber,
      AnnualRevenue: 0,
      Identifier: this.data?.dealDetails?.Id,
    };

    console.log('Payload***: ', Payload);

    this.isphoneNumberError = this.validatePhoneNumber(Payload.PhoneNumber);

    if (!this.isphoneNumberError || this.AddDealContactForm.invalid) {
      this.AddDealContact(Payload);
    }
  }

  // AddDealContact(DealId: string, Payload: any) {
  // let subscription = this._dealSvc
  //   .AddDealContact(DealId, Payload)
  //   .subscribe({
  //     next: (response: any) => {
  //       if (response) {
  //         this.toastr.success(response?.ResponseMessage)

  //         this.ngRedux.dispatch({
  //           type: ADD_DEAL_SECONDARY_CONTACT_SUCCESS,
  //           payload: Payload,
  //         });
  //         this.AddDealContactForm.reset();
  //         this.closeDialog();
  //       }
  //     },
  //     error: (err: any) => {
  //       if (err) {
  //         // console.error('Error: ', err);
  //         this.toastr.error(err?.statusText)
  //         this.ngRedux.dispatch({
  //           type: ADD_DEAL_SECONDARY_CONTACT_ERROR,
  //           payload: err,
  //         });
  //       }
  //     },
  //   });
  // this.Subscriptions.push(subscription)
  // }

  AddDealContact(Payload: any) {
    this.isSending = true;
    this.ngRedux.dispatch({ type: ADD_DEAL_CONTACT });
    let subscription = this._contactSvc.AddNewDealContact(Payload).subscribe({
      next: (response: any) => {
        if (response) {
          this.isSending = false;
          this.ngRedux.dispatch({ type: ADD_DEAL_CONTACT_SUCCESS, payload: Payload });
          // this._messengerSvc.sendSubject(
          //   'Contact successfully added to company!'
          // );
          this.toastr.success('Contact successfully added to deal!');
          this.dialogRef.close();
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
        this.isSending = false;
        this.ngRedux.dispatch({ type: ADD_DEAL_CONTACT_ERROR, payload: err });
        this.toastr.error('Adding contact fails, try again!');
      },
    });
    this.Subscriptions.push(subscription);
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
