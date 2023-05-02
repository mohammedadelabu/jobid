import { NgRedux, select } from '@angular-redux/store';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DealStage } from 'src/app/models/classes/map-deal';
import { DealService } from 'src/app/services/deal.service';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_DEAL_COMPANY_DETAILS,
  FETCH_DEAL_COMPANY_DETAILS_SUCCESS,
  FETCH_DEAL_DETAILS,
  FETCH_DEAL_DETAILS_ERROR,
  FETCH_DEAL_DETAILS_SUCCESS,
  FETCH_DEAL_PRIMARY_CONTACT_DETAILS,
  FETCH_DEAL_PRIMARY_CONTACT_DETAILS_SUCCESS,
  UPDATE_DEAL_STAGE,
  UPDATE_DEAL_STAGE_ERROR,
  UPDATE_DEAL_STAGE_SUCCESS,
} from 'src/STORE/_deal.store/deal.actions';
import { SendLeadEmailMessageFormDialogComponent } from '../../leads/send-lead-email-message-form-dialog/send-lead-email-message-form-dialog.component';
import { SendDealEmailMessageFormDialogComponent } from '../send-deal-email-message-form-dialog/send-deal-email-message-form-dialog.component';
import { TransferDealFormDialogComponent } from '../transfer-deal-form-dialog/transfer-deal-form-dialog.component';

@Component({
  selector: 'app-deal-details',
  templateUrl: './deal-details.component.html',
  styleUrls: ['./deal-details.component.scss'],
})
export class DealDetailsComponent implements OnInit, OnDestroy {
  @select((s) => s.deals.dealDetails) dealDetails$: any;
  @select((s) => s.deals.dealStage) dealStage$: any;
  @select((s) => s.deals.dealCompanyDetails) dealCompanyDetails$: any;
  @select((s) => s.deals.dealPrimaryContactDetails)
  dealPrimaryContactDetails$: any;
  @select((s) => s.deals.dealSecondaryContactList) dealSecondaryContactList$: any;
  @select((s) => s.deals.isLoading) isDealsLoading$: any;
  selectedStage!: string;
  // tabTitle = {
  //   fontFamily: 'Poppins',
  //   fontStyle: 'normal',
  //   fontWeight: '700',
  //   fontSize: '20px',
  //   lineHeight: '30px',
  //   color: '#4F656E',
  // };
  Deal: any;
  Subscriptions: Subscription[] = [];
  handOverStage = DealStage.HANDOVER;
  dealStages = [
    DealStage.DISCOVERY,
    DealStage.HANDOVER,
    DealStage.INTERVIEW,
    DealStage.SOLD,
    DealStage.LOST,
  ];
  isLoading = false;
  dealId: any;
  dealCompanyDetails: any;
  isUpdateDealStage: boolean = false
  constructor(
    public dialog: MatDialog,
    private _route: ActivatedRoute,
    private _dealSvc: DealService,
    private ngRedux: NgRedux<IAppState>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.selectedStage = 'Update stage'
    this.getParams();
    // this.isDealsLoading$.subscribe((loading: any) => {
    //   // if (loading) { this.isLoading = loading }
    //   this.isLoading = loading
    // })


    // this.isLoading$.subscribe((loading: any) => {
    //   if (loading) { this.isLoading = loading }
    // })
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }


  getParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        if (params) {
          console.log('params: ', params);
          this.dealId = params.get('dealId');
          this.onGetDealDetails(this.dealId);
        }
      },
      error: (err: any) => {

      },
    });
    this.Subscriptions.push(subscription);
  }

  onGetDealDetails(DealId: string) {
    this._dealSvc.LoadDealDetails(DealId);
    this.DealDetails();
  }

  DealDetails() {
    let subscription = this.dealDetails$.subscribe({
      next: (deal: any) => {
        if (deal) {
          console.log('deal: ', deal);
          this.Deal = deal;
          this.selectedStage = this.Deal?.DealStage;
          this.DealCompanyDetails();
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

  //

  onSelectFilter(stage: string, dealId: string, previousStage: string) {
    this.selectedStage = stage;
    // console.log(' previousStage: ', previousStage);
    // console.log(' this.selectedStage: ', this.selectedStage);
    // console.log(' DealId: ', dealId);
    const Payload = {
      stage: stage,
      dealId: dealId,
    };

    const dealInfo = {
      stage: stage,
      dealId: dealId,
      previousStage: previousStage,
    };
    this.isUpdateDealStage = true;

    this.ngRedux.dispatch({ type: UPDATE_DEAL_STAGE });
    this._dealSvc.UpdateStage(Payload).subscribe({
      next: (response: any) => {
        if (response) {
          this.isUpdateDealStage = false;
          this._dealSvc.LoadGroupDeals();
          this._dealSvc.LoadGroupedDealsCase();
          this.ngRedux.dispatch({
            type: UPDATE_DEAL_STAGE_SUCCESS,
            payload: dealInfo,
          });
          //  window.location.reload();
        }
      },
      error: (err: any) => {
        if (err) {
          this.isUpdateDealStage = false;
          console.warn('Error: ', err);
          this.ngRedux.dispatch({
            type: UPDATE_DEAL_STAGE_ERROR,
            payload: err,
          });
        }
      },
    });
  }

  openEmailMessageDialog() {
    let EmailList: any[] = [];

    this.dealPrimaryContactDetails$.subscribe((contact: any) => {
      EmailList.push(contact.ContactEmail)
    })
    this.dealSecondaryContactList$.subscribe((secondaryContacts: any) => {
      secondaryContacts.forEach((element: any) => {
        EmailList.push(element.EmailAddress)
      });
    })
    const dialogRef = this.dialog.open(
      SendDealEmailMessageFormDialogComponent, {
      width: '100%',
      maxWidth: '700px',
      data: {
        EmailAddressList: EmailList,
        DealId: this.Deal?.Id
      },
    }
    );

    dialogRef.afterClosed().subscribe((result) => { });
  }


  onOpenTransferDealFormDialog() {
    const dialogRef = this.dialog.open(
      TransferDealFormDialogComponent, {
      width: '100%',
      maxWidth: '700px',
      data: {
        DealId: this.Deal?.Id
      },
    }
    );

    dialogRef.afterClosed().subscribe((result) => { });
  }



  ngOnDestroy(): void {
    this.Subscriptions.forEach((s) => {

      if (!s.closed) {
        s.unsubscribe();
        // console.log('Unsubscribed!!!');
      }
    });
  }
}
