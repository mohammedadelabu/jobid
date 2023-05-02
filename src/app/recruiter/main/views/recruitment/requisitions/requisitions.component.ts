import { NgRedux, select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { QueryParamsModel } from 'src/app/models/types/queryParamsModel';
import { IdentityService } from 'src/app/services/identity.service';
import { RequisitionService } from 'src/app/services/requisition.service';
import { IAppState } from 'src/STORE/store';
import {
  REMOVE_REQUISITION,
  REMOVE_REQUISITION_ERROR,
  REMOVE_REQUISITION_SUCCESS,
} from 'src/STORE/_requisition.store/requisition.actions';
import { AddRequisitionComponent } from './add-requisition/add-requisition.component';
import { UpdateRequisitionStatusComponent } from './update-requisition-status/update-requisition-status.component';
import { UpdateRequisitionComponent } from './update-requisition/update-requisition.component';
import { UpdateSourceWeekComponent } from './update-source-week/update-source-week.component';

@Component({
  selector: 'app-requisitions',
  templateUrl: './requisitions.component.html',
  styleUrls: ['./requisitions.component.scss'],
})
export class RequisitionsComponent implements OnInit, OnDestroy {
  recruiterInformation: any;
  // requisitionsList: any;
  @select((s) => s.requisitionsList.requisitionsList)
  requisitionsList!: Observable<any>;
  @select((s) => s.requisitionsList.isLoading) isLoading: any;
  requisitionsListArray: any;
  isStatus!: boolean;
  subscriptions: Subscription[] = [];
  page = 1;
  pageSize = 10;
  totalPosts!: number;
  userQuery: QueryParamsModel = {
    PageSize: this.pageSize,
    PageNumber: this.page,
  };

  constructor(
    public dialog: MatDialog,
    private _identitySvc: IdentityService,
    private _requisitionSvc: RequisitionService,

    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit(): void {
    this.onGetLoggedInRecruiter();
    this.onGetRequisitionList();

    let subscription =
      this._requisitionSvc.requisitionMessengerSubject.subscribe({
        next: (message: any) => {
          if (message) {
            if (message === 'delete') {
              // Check if requisition list has only one item
              const numberOfItems = this.requisitionsListArray.length;
              if (numberOfItems === 1 && this.page !== 1) {
                this.pageChangeEvent(this.page - 1);
              }
            }
            this.onGetRequisitionList();
          }
        },
      });
    this.subscriptions?.push(subscription);

    this.requisitionsList.subscribe((response: any) => {
      console.log('s', response);
      this.requisitionsListArray = response?.Items;
      this.totalPosts = response?.TotalSize;
    });
  }

  openDialog() {
    const x = this.dialog.open(AddRequisitionComponent, {
      // maxHeight: '100%',
      minWidth: '80%',
      data: {
        RecruiterData: this.recruiterInformation,
      },
    });
    x.afterClosed().subscribe((result) => {});
  }

  openUpdateRequisitionFormDialog(Data: any) {
    console.log('Data: ', Data);
    this.dialog.open(UpdateRequisitionComponent, {
      // maxHeight: '100%',
      minWidth: '80%',
      data: {
        requisition: Data,
      },
    });
  }

  openUpdateSourceWeekDialog(Data: any) {
    console.log('Data: ', Data);
    this.dialog.open(UpdateSourceWeekComponent, {
      maxWidth: '600px',
      data: {
        requisition: Data,
      },
    });
  }

  onGetLoggedInRecruiter() {
    let x = this._identitySvc.getLoggedInUserData();
    console.log('x>>>: ', x);
    this.getLoggedInUserDetails(x?.Email);
  }

  getLoggedInUserDetails(UserEmail: string) {
    let subscription = this._identitySvc.getUserByEmail(UserEmail).subscribe({
      next: (response: any) => {
        this.recruiterInformation = {
          UserId: response?.Id,
          UpdatedBy: response?.Email,
          Recruiter: `${response?.FirstName} ${response?.LastName}`,
        };
        console.log('this.recruiterInformation: ', this.recruiterInformation);
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions?.push(subscription);
  }

  toggleIsStatus() {
    this.isStatus = !this.isStatus;
  }

  onGetRequisitionList() {
    this._requisitionSvc.LoadRequisition(buildQueryParams(this.userQuery));
    console.log('todoList: ', this.requisitionsList);
    // this._requisitionSvc.GetRequisition().subscribe({
    //   next: (response) => {
    //
    //     if (response) {
    //       this.requisitionsList = response;
    //     }
    //   },
    //   error: (err: any) => {
    //     console.warn('Error: ', err);
    //   },
    // });
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.userQuery['PageNumber'] = event;
    this.onGetRequisitionList();
  }

  onRemoveRequisition(Id: string) {
    console.log('Id: ', Id);
    // this.ngRedux.dispatch({ type: REMOVE_REQUISITION});
    let subscription = this._requisitionSvc.RemoveRequisition(Id).subscribe({
      next: (response) => {
        if (response) {
          this._requisitionSvc.SendRequisitionMessengerSubject('delete');
          // this.ngRedux.dispatch({ type: REMOVE_REQUISITION_SUCCESS, id: Id });
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
        // this.ngRedux.dispatch({ type: REMOVE_REQUISITION_ERROR, error: err });
      },
    });
    this.subscriptions?.push(subscription);
  }

  filterByStatus(status: validStatus) {
    this.page = 1;
    if (status === 'all') {
      this.userQuery = {
        ...this.userQuery,
        PageSize: this.pageSize,
        PageNumber: this.page,
      };
      delete this.userQuery.Status;
    } else {
      this.userQuery = {
        ...this.userQuery,
        PageSize: this.pageSize,
        PageNumber: this.page,
        Status: status,
      };
    }
    this.onGetRequisitionList();
  }

  onSortByAphabeticalOrder(Property: string) {
    this.page = 1;
    this.userQuery = {
      ...this.userQuery,
      PageSize: this.pageSize,
      PageNumber: this.page,
      AlphabeticalOrder: true,
    };
    delete this.userQuery.Recent;
    delete this.userQuery.Oldest;
    this.onGetRequisitionList();
  }

  onSortByMostRecent() {
    this.page = 1;
    this.userQuery = {
      ...this.userQuery,
      PageSize: this.pageSize,
      PageNumber: this.page,
      Recent: true,
    };
    delete this.userQuery.AlphabeticalOrder;
    delete this.userQuery.Oldest;
    this.onGetRequisitionList();
  }

  onSortByOldest(Property: string) {
    this.page = 1;
    this.userQuery = {
      ...this.userQuery,
      PageSize: this.pageSize,
      PageNumber: this.page,
      Oldest: true,
    };
    delete this.userQuery.AlphabeticalOrder;
    delete this.userQuery.Recent;
    this.onGetRequisitionList();
  }

  filterByRegion(region: validRegion) {
    this.page = 1;
    if (region === 'all') {
      this.userQuery = {
        ...this.userQuery,
        PageSize: this.pageSize,
        PageNumber: this.page,
      };
      delete this.userQuery.Region;
    } else {
      this.userQuery = {
        ...this.userQuery,
        PageSize: this.pageSize,
        PageNumber: this.page,
        Region: region,
      };
    }
    this.onGetRequisitionList();
  }

  clearFilters() {
    this.page = 1;
    this.userQuery = {
      PageSize: this.pageSize,
      PageNumber: this.page,
    };
    this.onGetRequisitionList();
  }

  onScrollRight() {
    let container: any = document.getElementById('container');
    container.scrollLeft += 20;
    // console.log("container: ", container)
  }

  onScrollLeft() {
    let container: any = document.getElementById('container');
    container.scrollLeft -= 20;
    // console.log("container: ", container)
  }

  back() {
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

type validStatus =
  | 'rejected'
  | 'awaiting feedback'
  | 'closed'
  | 'completed'
  | 'ongoing'
  | 'awaiting feedback'
  | 'new'
  | 'onhold'
  | 'all'
  | 'rollover';

type validRegion = 'all' | 'africa' | 'eu';
