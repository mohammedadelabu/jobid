import { NgRedux, select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { PermissionName } from 'src/app/services/admin-role-and-permission.service';
import { LeadTagService } from 'src/app/services/lead-tag.service';
import { LeadPaged, LeadService, Tag } from 'src/app/services/lead.service';
import { IAppState } from 'src/STORE/store';
import {
  BULK_REMOVE_LEAD,
  BULK_REMOVE_LEAD_ERROR,
  BULK_REMOVE_LEAD_SUCCESS,
} from 'src/STORE/_lead.store/lead.actions';
import { CreateTaskComponent } from '../task/create-task/create-task.component';
import { ImportLeadFormDialogComponent } from './import-lead-form-dialog/import-lead-form-dialog.component';
import { SendLeadEmailMessageFormDialogComponent } from './send-lead-email-message-form-dialog/send-lead-email-message-form-dialog.component';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
})
export class LeadsComponent implements OnInit, OnDestroy {
  @select((s) => s.leads.leadsList) leadsList$: any;
  @select((s) => s.leads.isLoading) isLoading$: any;
  @select((s) => s.leadTags.leadTags) leadTags$: any;
  @select((s) => s.leadTags.isLoading) leadTagsIsLoading$: any;
  onDeleteLeadEventSubject: Subject<void> = new Subject<void>();
  leadsListArray: any;
  selectAllCheckbox = false;
  Subscriptions: Subscription[] = [];
  paginationData = {
    page: 1,
    count: 0,
    reverse: true,
    ItemsPerPage: 50,
    totalRecords: null,
  };

  DateFilterSearchData: any = {
    StartDate: null,
    EndDate: null,
  };

  TagFilterSearchData: any = {
    TagId: null,
  };

  foods: Food[] = [
    // { value: 'EmailAddress', viewValue: 'Email' },
    // { value: 'Tag', viewValue: 'Tag' },
    // { value: 'PhoneNumber', viewValue: 'Phone' },
    { value: 'test1', viewValue: 'Test 1' },
    { value: 'test2', viewValue: 'Test 2' },
  ];
  leadTags: any;
  EmailList: string[] = [];
  // range = new FormGroup({
  //   // start: new FormControl<Date | null>(null),
  //   // end: new FormControl<Date | null>(null),
  //   start: new FormControl(null),
  //   end: new FormControl(null),
  // });
  range!: FormGroup;
  tagSearch!: FormGroup;
  SelectedLeadList: any[] = [];
  Update = PermissionName.Update;
  View = PermissionName.View;
  Delete = PermissionName.Delete;
  Create = PermissionName.Create;
  isSearchLead: boolean = false;
  dateRangeValue: any;

  constructor(
    private _leadSvc: LeadService,
    public dialog: MatDialog,
    private _router: Router,
    private ngRedux: NgRedux<IAppState>,
    private _leadTagSvc: LeadTagService,
    private _fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.onGetLeadsList();
    this.onGetLeadMessage();
    this.onGetLeadTags();
    this.buildForm();
    console.log('list', this.leadsList$);
  }

  buildForm() {
    this.range = this._fb.group({
      Start: '',
      End: '',
    });
    this.tagSearch = this._fb.group({
      Tag: '',
    });
  }

  focusPicker(picker: any) {
    picker.open();
  }

  onGetLeadTags() {
    // this.leadTags = this._leadSvc.GetLeadTags();
    this._leadTagSvc.LoadLeadTags();
  }

  onGetLeadMessage() {
    let subscription = this._leadSvc.LeadMessengerSubject.subscribe({
      next: (message: any) => {
        if (message) {
          this.onGetLeadsList();
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.Subscriptions.push(subscription);
  }

  onGetLeadsList() {
    this.isSearchLead = false;
    // let subscription = this._leadSvc.LoadLeadsList().subscribe({
    //   next: (response: any) => {
    //
    //     if (response) {
    //       if (response.ResponseCode == '404') {
    //         this.leadsListArray = [];
    //       } else {
    //         this.leadsListArray = response.Data;
    //       }
    //     }
    //   },
    //   error: (err: any) => {
    //
    //   },
    // });
    // this.Subscriptions.push(subscription);

    // this._leadSvc.LoadLeadsList();

    const Payload: LeadPaged = {
      StartDate: null,
      EndDate: null,
      TagId: null,
      PageSize: this.paginationData.ItemsPerPage,
      PageNumber: this.paginationData.page,
    };
    this._leadSvc.LoadLeadPagedList(Payload);
    let subscription = this.leadsList$.subscribe((response: any) => {
      if (response) {
        this.leadsListArray = response?.Items;
        this.paginationData.page = response?.PageNumber;
        this.paginationData.ItemsPerPage = response?.PageSize;
        this.paginationData.totalRecords = response?.TotalSize;
        this.appendIsCheckProperty(false);
        // const newLeadList: any[] = [];
        // this.leadsListArray.map((l: any) => {
        //   let m = { ...l, isChecked: false };
        //   newLeadList.push(m);
        //   console.log('newLeadList', newLeadList);
        //   this.leadsListArray = newLeadList;
        // });
      }
    });
    this.Subscriptions.push(subscription);
    // console.log('leadsList: ', this.leadsList$);
  }

  onSortByAphabeticalOrder(Property: string) {
    this.leadsListArray.sort((a: any, b: any) =>
      a[Property] > b[Property] ? 1 : -1
    );
  }

  onSortByMostRecent(Property: string) {
    let subscription = this.leadsList$.subscribe((response: any) => {
      if (response) {
        this.leadsListArray = response.Items.sort((a: any, b: any) =>
          a[Property] > b[Property] ? 1 : -1
        );
      }
    });
    this.Subscriptions?.push(subscription);
  }

  onSortByOldest(Property: string) {
    let subscription = this.leadsList$.subscribe((response: any) => {
      if (response) {
        this.leadsListArray = response.Items.sort((a: any, b: any) =>
          a[Property] > b[Property] ? 1 : -1
        ).reverse();
      }
    });
    this.Subscriptions?.push(subscription);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ImportLeadFormDialogComponent, {
      width: '100%',
      maxWidth: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onGetLeadsList();
      }
    });
  }

  appendIsCheckProperty(BooleanValue: boolean) {
    const newLeadList: any[] = [];

    if (this.leadsListArray?.length > 0) {
      this.leadsListArray.map((l: any) => {
        let m = { ...l, isChecked: BooleanValue };
        newLeadList.push(m);
        this.leadsListArray = newLeadList;
      });
    }

    if (BooleanValue) {
      for (let t in newLeadList) {
        this.EmailList.push(newLeadList[t].EmailAddress);
      }
    } else {
      for (let t in newLeadList) {
        // console.log('newLeadList t: ', newLeadList[t]);
        // this.EmailList.push(newLeadList[t].EmailAddress);
        // console.log('this.EmailList: ', this.EmailList);

        if (this.EmailList.length > 0) {
          let email_list = [...this.EmailList];
          this.EmailList = email_list.filter(
            (f: any) => f != newLeadList[t].EmailAddress
          );
        }
      }
    }
    // let x = [...this.leadsListArray];
    // this.leadsListArray.forEach((i: any) => {
    //   let = x.filter((d) => d.isChecked == true);
    // });
  }

  onGetEmailList($event: any) {
    this.EmailList = $event;
  }
  onGetSelectedLeadList($event: any) {
    this.SelectedLeadList = $event;
    // console.log('this.SelectedLeadList $event: ', $event);
  }
  onDeleteMultipleLeads() {
    let confirmation = confirm('Are you sure you want to delete these leads?');
    if (!confirmation) {
      return;
    }
    this.ngRedux.dispatch({ type: BULK_REMOVE_LEAD });
    console.log('this.SelectedLeadList: ', this.SelectedLeadList);
    let Payload: string[] = [];
    for (let i = 0; i < this.SelectedLeadList.length; i++) {
      Payload.push(this.SelectedLeadList[i]?.Id);
    }
    if (Payload.length) {
      console.log('Payload: ', Payload);
      this._leadSvc.BulkRemoveLead(Payload).subscribe({
        next: (response: any) => {
          if (response) {
            console.log('response: ', response);
            if (response.ResponseCode == '200') {
              // this.toastr.success(response?.ResponseMessage)
              this.ngRedux.dispatch({
                type: BULK_REMOVE_LEAD_SUCCESS,
                payload: Payload,
              });
              if (Payload.length > 1) this.toastr.success('Leads removed!');
              if (Payload.length == 1) this.toastr.success('Lead removed!');
              this.SelectedLeadList = [];
              this.EmailList = [];
              this.onDeleteLeadEventSubject.next();
            }
          }
        },
        error: (err: any) => {
          if (err) {
            console.warn('Error: ', err);
            this.toastr.error(err?.statusText);
            this.ngRedux.dispatch({
              type: BULK_REMOVE_LEAD_ERROR,
              payload: err,
            });
          }
        },
      });
    }
  }

  openEmailMessageDialog() {
    const dialogRef = this.dialog.open(
      SendLeadEmailMessageFormDialogComponent,
      {
        width: '100%',
        maxWidth: '700px',
        data: {
          EmailAddressList: this.EmailList,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '100%',
      maxWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  onSubmitSearchByDateRangeForm() {
    // console.log('onSubmitSearchByDateRangeForm: ', this.range.value);
  }

  onChange($event: any) {
    // console.log('onSubmitSearchByDateRangeForm: ', this.range.value);
    console.log('$event: ', $event.value);
    this.dateRangeValue = $event.value;
    if (!$event.value) {
      this.onGetLeadsList();
      return;
    }
    const DateSearchData = {
      StartDate: new Date(this.range.value.Start).toDateString(),
      EndDate: new Date(this.range.value.End).toDateString(),
    };
    this.DateFilterSearchData.StartDate = DateSearchData.StartDate;
    this.DateFilterSearchData.EndDate = DateSearchData.EndDate;
    const Payload: LeadPaged = {
      StartDate: this.DateFilterSearchData.StartDate,
      EndDate: this.DateFilterSearchData.EndDate,
      TagId: this.TagFilterSearchData.TagId,
      PageSize: this.paginationData.ItemsPerPage,
      PageNumber: 1,
    };
    this._leadSvc.LoadLeadPagedList(Payload);
    this.isSearchLead = true;
  }

  onChangeTagSearch() {
    const TagSearchData = {
      TagId: this.tagSearch.value.Tag?.id,
    };
    this.TagFilterSearchData.TagId = TagSearchData.TagId;
    if (this.dateRangeValue) {
      const Payload: LeadPaged = {
        StartDate: this.DateFilterSearchData.StartDate,
        EndDate: this.DateFilterSearchData.EndDate,
        TagId: this.TagFilterSearchData.TagId,
        PageSize: this.paginationData.ItemsPerPage,
        PageNumber: 1,
      };
      this._leadSvc.LoadLeadPagedList(Payload);
    } else {
      const Payload: LeadPaged = {
        StartDate: null,
        EndDate: null,
        TagId: this.TagFilterSearchData.TagId,
        PageSize: this.paginationData.ItemsPerPage,
        PageNumber: 1,
      };
      this._leadSvc.LoadLeadPagedList(Payload);
    }
    this.isSearchLead = true;
  }

  pageChangeEvent($event: any) {
    this.paginationData.page = $event;
    const Payload: LeadPaged = {
      StartDate: this.DateFilterSearchData.StartDate,
      EndDate: this.DateFilterSearchData.EndDate,
      TagId: this.TagFilterSearchData.TagId,
      PageSize: this.paginationData.ItemsPerPage,
      PageNumber: this.paginationData.page,
    };
    this._leadSvc.LoadLeadPagedList(Payload);
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
