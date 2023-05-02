import { NgRedux, select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { QueryParamsModel } from 'src/app/models/types/queryParamsModel';
import { PermissionName } from 'src/app/services/admin-role-and-permission.service';
import { CompanyService } from 'src/app/services/company.service';
import { IAppState } from 'src/STORE/store';
import { Bulk_REMOVE_COMPANY_FOR_USER, Bulk_REMOVE_COMPANY_FOR_USER_ERROR, Bulk_REMOVE_COMPANY_FOR_USER_SUCCESS, REMOVE_COMPANY_FOR_USER, REMOVE_COMPANY_FOR_USER_ERROR, REMOVE_COMPANY_FOR_USER_SUCCESS } from 'src/STORE/_company.store/company.actions';
import { InviteCompanyFormComponent } from '../components/invite-company-form/invite-company-form.component';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit, OnDestroy {
  @select((s) => s.company.companyList) companyList$: any;
  @select((s) => s.company.isLoadingCompanyList) isCompanyListLoading$: any;
  @select((s) => s.company.companyListForUser) companyListForUser$: any;
  @select((s) => s.company.isLoadingCompanyListForUser)
  isCompanyListForUserLoading$: any;

  totalPosts!: string;
  page = 1;
  pageSize = 10;
  count = 0;
  companyList: any;
  subscriptions: Subscription[] = [];
  selectAllCheckbox = false;
  SelectedCompanyList: any[] = [];
  CompanyIdList: string[] = [];
  Delete = PermissionName.Delete;
  isDeleting: boolean = false;

  userQuery: QueryParamsModel = {
    PageSize: this.pageSize,
    PageNumber: this.page,
  };
  constructor(
    private _companySvc: CompanyService,
    public dialog: MatDialog,
    private _router: Router,
    private ngRedux: NgRedux<IAppState>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCompanyListForUser();

    let subscription = this.companyListForUser$.subscribe({
      next: (response: any) => {
        this.totalPosts = response?.TotalSize;
        this.companyList = response?.Items;
        // if (list) {
        //   this.companyList = list;
        // } else {
        //   this.companyList = [];
        // }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  openDialog() {
    this.dialog.open(InviteCompanyFormComponent, {
      width: '100%',
      maxWidth: '850px',
    });
  }

  getCompanyList() {
    this._companySvc.LoadCompanyList();
    // this._companySvc.LoadCompaniesForUser();
    let subscription = this.companyList$.subscribe({
      next: (list: any) => {
        if (list) {
          this.companyList = list;
        } else {
          this.companyList = [];
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  getCompanyListForUser() {
    console.warn("delete function");
    this._companySvc.LoadCompaniesForUser(buildQueryParams(this.userQuery));
    // this._companySvc.LoadCompaniesForUser();
  }

  deleteCompany(CompanyId: string) {
    let confirmation = confirm('Are you sure you want to delete this company?');
    if (!confirmation) {
      return;
    }
    this.isDeleting = true;
    this.ngRedux.dispatch({ type: REMOVE_COMPANY_FOR_USER })
    let subscription = this._companySvc.deleteCompany(CompanyId).subscribe({
      next: (response: any) => {
        if (response) {
          console.warn('response: ', response);
          this.ngRedux.dispatch({ type: REMOVE_COMPANY_FOR_USER_SUCCESS, payload: CompanyId });
          this.isDeleting = false;
          this.toastr.success(response?.ResponseMessage)
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
        this.ngRedux.dispatch({ type: REMOVE_COMPANY_FOR_USER_ERROR, payload: err })
        this.isDeleting = false;
      },
    });
    this.subscriptions.push(subscription);
  }

  onDeleteMultipleCompany() {
    let confirmation = confirm('Are you sure you want to delete selected companies?');
    if (!confirmation) {
      return;
    }
    this.isDeleting = true;
    this.ngRedux.dispatch({ type: Bulk_REMOVE_COMPANY_FOR_USER });
    // console.log('this.SelectedLeadList: ', this.SelectedCompanyList);
    let Payload: string[] = [];
    for (let i = 0; i < this.SelectedCompanyList.length; i++) {
      Payload.push(this.SelectedCompanyList[i]?.Company);
    }
    if (Payload.length) {
      console.log('Payload: ', Payload);
      this._companySvc.bulkRemoveCompany([...this.CompanyIdList]).subscribe({
        next: (response: any) => {
          if (response) {
            // console.log('response: ', response);
            if (response.ResponseCode == '200') {
              this.toastr.success(response?.ResponseMessage)
              this.ngRedux.dispatch({
                type: Bulk_REMOVE_COMPANY_FOR_USER_SUCCESS,
                payload: [...this.CompanyIdList],
              });
              // if (Payload.length > 1) this.toastr.success('Leads removed!');
              // if (Payload.length == 1) this.toastr.success('Lead removed!');
              this.SelectedCompanyList = [];
              this.CompanyIdList = [];
              this.isDeleting = false;
            }
          }
        },
        error: (err: any) => {
          if (err) {
            // console.warn('Error: ', err);
            this.toastr.error(err?.statusText);
            this.ngRedux.dispatch({
              type: Bulk_REMOVE_COMPANY_FOR_USER_ERROR,
              payload: err,
            });
            this.isDeleting = false;
          }
        },
      });
    }
  }

  onRouteToDetailsPage(CompanyId: string) {
    // console.log(CompanyId);
    this._router.navigate([
      `/recruiter/crm/companies/company-details/${CompanyId}`,
    ]);
  }

  onEditCompany(CompanyId: string) {
    // console.log(CompanyId);
    this._router.navigate([
      `/recruiter/crm/companies/edit-contact/${CompanyId}`,
    ]);
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.userQuery = {
      ...this.userQuery,
      PageNumber: event,
    };
    this.getCompanyListForUser();
  }

  onSelectAllCompany() {
    if (this.selectAllCheckbox) {
      this.appendIsCheckProperty(true);
    } else {
      this.appendIsCheckProperty(false);
    }
  }

  onSelectCompany(Company: any) {
    // console.log('Company: ', Company);
    //
    if (Company.isChecked) {
      if (this.CompanyIdList.length > 0) {
        let isExist = this.CompanyIdList.find(
          (f: any) => f == Company.CompanyId
        );
        // console.log('isExist: ', isExist);
        if (isExist) {
          return;
        } else {
          this.CompanyIdList.push(Company.CompanyId);
        }
      } else {
        this.CompanyIdList.push(Company.CompanyId);
      }
    } else {
      if (this.CompanyIdList.length > 0) {
        let companyId_list = [...this.CompanyIdList];
        this.CompanyIdList = companyId_list.filter(
          (f: any) => f != Company.CompanyId
        );
      }
    }
    // console.log('this.companyList: ', this.companyList);
    // console.log('this.CompanyIdList: ', this.CompanyIdList);

    //

    //
    if (Company.isChecked) {
      if (this.SelectedCompanyList.length > 0) {
        let isExist = this.SelectedCompanyList.find(
          (f: any) => f.CompanyId == Company.CompanyId
        );
        // console.log('isExist: ', isExist);
        if (isExist) {
          return;
        } else {
          this.SelectedCompanyList.push(Company);
        }
      } else {
        this.SelectedCompanyList.push(Company);
      }
    } else {
      if (this.SelectedCompanyList.length > 0) {
        let _leadList = [...this.SelectedCompanyList];
        this.SelectedCompanyList = _leadList.filter(
          (f: any) => f.CompanyId != Company.CompanyId
        );
      }
    }
    // console.log('this.SelectedCompanyList: ', this.SelectedCompanyList);
  }

  appendIsCheckProperty(BooleanValue: boolean) {
    const newCompanyList: any[] = [];
    this.companyList.map((l: any) => {
      let m = { ...l, isChecked: BooleanValue };
      newCompanyList.push(m);
      this.companyList = newCompanyList;
    });

    if (BooleanValue) {
      for (let t in newCompanyList) {
        this.CompanyIdList.push(newCompanyList[t].CompanyId);
        this.SelectedCompanyList.push(newCompanyList[t]);
      }
    } else {
      for (let t in newCompanyList) {
        if (this.CompanyIdList.length > 0) {
          let id_list = [...this.CompanyIdList];
          this.CompanyIdList = id_list.filter(
            (f: any) => f != newCompanyList[t].CompanyId
          );
          // console.log('this.EmailList: ', this.EmailList);
        }

        if (this.SelectedCompanyList.length > 0) {
          let company_list = [...this.SelectedCompanyList];
          this.SelectedCompanyList = company_list.filter(
            (f: any) => f.CompanyId != newCompanyList[t].CompanyId
          );
        }
      }
    }
    // let x = [...this.companyList];
    // this.companyList.forEach((i: any) => {
    //   let = x.filter((d) => d.isChecked == true);
    // });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
