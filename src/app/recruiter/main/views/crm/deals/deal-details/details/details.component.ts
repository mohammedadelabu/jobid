import { select } from '@angular-redux/store';
import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { subscribeOn, Subscription } from 'rxjs';
import { DealContact } from 'src/app/models/types/deal';
import { ContactService } from 'src/app/services/contact.service';
import { DealService } from 'src/app/services/deal.service';
import { AddDealContactComponent } from '../../add-deal-contact/add-deal-contact.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  @select((s) => s.dealContacts.contactList) dealContactList$: any;
  @select((s) => s.dealContacts.isLoading) isDealContactListLoading$: any;
  @select((s) => s.deals.dealDetails) dealDetails$: any;
  @select((s) => s.deals.dealCompanyDetails) dealCompanyDetails$: any;
  @select((s) => s.deals.dealPrimaryContactDetails)
  dealPrimaryContactDetails$: any;
  @select((s) => s.deals.dealSecondaryContactList)
  dealSecondaryContactList$: any;
  dealPrimaryContactDetails: any;
  dealsJobVacancyList!: any[];

  brandLogo = '../../../../../../../assets/images/zart-brand-logo.png';
  isEditCompanyInfo = false;
  isEditCompanyContact = false;
  isAddCompanyContact = false;
  isEditSecondaryContact = false;
  Subscriptions: Subscription[] = [];
  dealCompanyDetails: any;
  dealDetails: any;
  DealContactList: any;

  constructor(
    public dialog: MatDialog,
    private _dealSvc: DealService,
    private _route: ActivatedRoute,
    private _contactSvc: ContactService
  ) { }

  ngOnInit(): void {
    this.DealDetails();
    this.DealCompanyDetails();
    this.onGetDealsPrimaryContact();
  }

  onGetDealDetails(DealId: string) {
    this._dealSvc.LoadDealDetails(DealId);
  }
  DealDetails() {
    let subscription = this.dealDetails$.subscribe({
      next: (deal: any) => {
        if (deal) {
          // console.log('deal: ', deal);
          this.dealDetails = deal;
          console.log('dealDetails: ', this.dealDetails);
          this.onGetDealContacts(this.dealDetails?.Id);
          this.dealsJobVacancyList = deal?.vacancy
        }
      },
      error: (err: any) => {
        if (err) {
        }
      },
    });
    this.Subscriptions.push(subscription);
  }

  DealCompanyDetails() {
    let subscription = this.dealCompanyDetails$.subscribe({
      next: (details: any) => {
        if (details) {
          // console.log('details: ', details);
          this.dealCompanyDetails = details;
        }
      },
      error: (err: any) => {
        if (err) {
        }
      },
    });
    this.Subscriptions.push(subscription);
  }

  onGetDealsPrimaryContact() {
    let subscription = this.dealPrimaryContactDetails$.subscribe({
      next: (details: any) => {
        if (details) {
          this.dealPrimaryContactDetails = details;
          console.log('details: ', details);
        }
      },
      error: (err: any) => {
        if (err) {
          console.error('Error: ', err);
        }
      },
    });
    this.Subscriptions.push(subscription);
  }

  onGetDealContacts(DealId: any) {
    this._contactSvc.GetDealsContact(DealId);
    this.dealContactList$.subscribe({
      next: (response: any) => {
        console.warn('response***: ', response);
        if (response) {
          if (response.ResponseCode == '00') {
            this.DealContactList = response.Data;
          } else {
            this.DealContactList = [];
          }
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }

  onCloseUpdateDealContactForm($event: boolean) {
    this.isEditCompanyContact = $event;
    // console.log("$event: ", $event)
  }
  onCloseAddDealContactForm($event: boolean) {
    this.isAddCompanyContact = $event;
  }

  openCompanyContactDialog() {
    this.dialog.open(AddDealContactComponent, {
      width: '100%',
      maxWidth: '700px',
      data: {
        dealDetails: this.dealDetails,
      },
    });
  }

  onEditContact(contact: DealContact) {
    console.log('contact: ', contact);
    this.isEditSecondaryContact = true;
    this._dealSvc.SendDealContactBehaviourSubj(contact);
  }

  onCloseEditDealSecondaryContactForm($event: any) {
    this.isEditSecondaryContact = $event;
  }

  onCloseUpdateDealCompanyForm($event: any) {
    this.isEditCompanyInfo = $event;
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
