import { NgRedux } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { LeadTagService } from 'src/app/services/lead-tag.service';
import { LeadService } from 'src/app/services/lead.service';
import { IAppState } from 'src/STORE/store';
import {
  REMOVE_LEAD,
  REMOVE_LEAD_ERROR,
  REMOVE_LEAD_SUCCESS,
} from 'src/STORE/_lead.store/lead.actions';
import { UpdateLeadComponent } from '../update-lead/update-lead.component';

@Component({
  selector: 'app-lead-list-table',
  templateUrl: './lead-list-table.component.html',
  styleUrls: ['./lead-list-table.component.scss'],
})
export class LeadListTableComponent implements OnInit {
  @Input() leadsListArray: any;
  @Input() isLoadingData: any;
  @Input() paginationData: any;
  @Input() deleteLead!: Subject<void>;
  @Output() GetEmailList = new EventEmitter();
  @Output() GetSelectedLeadList = new EventEmitter();
  selectAllCheckbox = false;
  EmailList: string[] = [];
  SelectedLeadList: any[] = [];
  Subscriptions: Subscription[] = [];
  constructor(
    private _router: Router,
    private _leadSvc: LeadService,
    private ngRedux: NgRedux<IAppState>,
    public dialog: MatDialog,
    private _leadTagSvc: LeadTagService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.onGetEmailList();
    this.onGetSelectedLeadlList();
    // this.onDeleteLead()
  }

  onDeleteLead() {
    const subscription = this.deleteLead.subscribe({
      next: () => {
        this.SelectedLeadList = [];
        this.EmailList = [];
      },
    });

    this.Subscriptions.push(subscription)
  }

  onGetEmailList() {
    this.GetEmailList.emit(this.EmailList);
  }

  onGetSelectedLeadlList() {
    this.GetSelectedLeadList.emit(this.SelectedLeadList);
  }

  onSelectLead(item: any) {
    //
    if (item.isChecked) {
      if (this.EmailList.length > 0) {
        let isExist = this.EmailList.find((f: any) => f == item.EmailAddress);
        // console.log('isExist: ', isExist);
        if (isExist) {
          return;
        } else {
          this.EmailList.push(item.EmailAddress);
          this.onGetEmailList();
        }
      } else {
        this.EmailList.push(item.EmailAddress);
        this.onGetEmailList();
      }
    } else {
      if (this.EmailList.length > 0) {
        let email_list = [...this.EmailList];
        this.EmailList = email_list.filter((f: any) => f != item.EmailAddress);
        this.onGetEmailList();
      }
    }
    // console.log('this.leadsListArray: ', this.leadsListArray);
    // console.log('this.EmailList: ', this.EmailList);

    //

    //
    if (item.isChecked) {
      if (this.SelectedLeadList.length > 0) {
        let isExist = this.SelectedLeadList.find((f: any) => f.Id == item.Id);
        // console.log('isExist: ', isExist);
        if (isExist) {
          return;
        } else {
          this.SelectedLeadList.push(item);
          this.onGetSelectedLeadlList();
        }
      } else {
        this.SelectedLeadList.push(item);
        this.onGetSelectedLeadlList();
      }
    } else {
      if (this.SelectedLeadList.length > 0) {
        let _leadList = [...this.SelectedLeadList];
        this.SelectedLeadList = _leadList.filter((f: any) => f.Id != item.Id);
        this.onGetSelectedLeadlList();
      }
    }
    // console.log('this.SelectedLeadList: ', this.SelectedLeadList);
  }

  onSelectLeadAll() {
    if (this.selectAllCheckbox) {
      this.appendIsCheckProperty(true);
      this.onGetEmailList();
      this.onGetSelectedLeadlList();
    } else {
      this.appendIsCheckProperty(false);
      this.onGetEmailList();
      this.onGetSelectedLeadlList();
    }
  }

  appendIsCheckProperty(BooleanValue: boolean) {
    const newLeadList: any[] = [];
    this.leadsListArray.map((l: any) => {
      let m = { ...l, isChecked: BooleanValue };
      newLeadList.push(m);
      this.leadsListArray = newLeadList;
    });

    if (BooleanValue) {
      for (let t in newLeadList) {
        this.EmailList.push(newLeadList[t].EmailAddress);
        this.SelectedLeadList.push(newLeadList[t]);
      }
    } else {
      for (let t in newLeadList) {
        if (this.EmailList.length > 0) {
          let email_list = [...this.EmailList];
          this.EmailList = email_list.filter(
            (f: any) => f != newLeadList[t].EmailAddress
          );
          // console.log('this.EmailList: ', this.EmailList);
        }

        if (this.SelectedLeadList.length > 0) {
          let lead_list = [...this.SelectedLeadList];
          this.SelectedLeadList = lead_list.filter(
            (f: any) => f.Id != newLeadList[t].Id
          );
        }
      }
    }
    // let x = [...this.leadsListArray];
    // this.leadsListArray.forEach((i: any) => {
    //   let = x.filter((d) => d.isChecked == true);
    // });
  }

  onConvertLeadToDeal(Lead: any) {
    this._router.navigate([
      '/recruiter/crm/leads/convert-lead-to-deal',
      Lead.Id,
    ]);
  }

  onRemoveLead(Id: any) {
    let confirmation = confirm('Are you sure you want to delete this lead?');
    if (!confirmation) {
      return;
    }
    this.ngRedux.dispatch({
      type: REMOVE_LEAD,
    });
    // let subscription = this._leadSvc.DeleteLead(Id).subscribe({
    let subscription = this._leadSvc.DeleteLead(Id).subscribe({
      next: (response: any) => {
        if (response) {
          console.log('response : ', response);
          this._toastr.success(response?.ResponseMessage)
          this.ngRedux.dispatch({
            type: REMOVE_LEAD_SUCCESS,
            payload: Id,
          });
          this.SelectedLeadList = [];
        }
      },
      error: (err: any) => {
        console.warn('err: ', err);
        this._toastr.error(err?.statusText);
        this.ngRedux.dispatch({
          type: REMOVE_LEAD_ERROR,
          payload: err,
        });
      },
    });
    this.Subscriptions.push(subscription);
  }

  openUpdateLeadFormDialog(lead: any) {
    this._router.navigate([`/recruiter/crm/edit-lead/${lead?.Id}`]);

    // const dialogRef = this.dialog.open(UpdateLeadComponent, {
    //   width: '100%',
    //   data: {
    //     lead: lead,
    //   },
    // });

    // dialogRef.afterClosed().subscribe((result) => {

    // });
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
