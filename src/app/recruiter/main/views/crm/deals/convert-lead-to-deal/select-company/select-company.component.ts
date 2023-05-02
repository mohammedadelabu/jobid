import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { QueryParamsModel } from 'src/app/models/types/queryParamsModel';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.scss']
})
export class SelectCompanyComponent implements OnInit {
  @select((s) => s.company.companyList) companyList$: any;
  @select((s) => s.company.isLoading) isCompanyListLoading$: any;
  @select((s) => s.company.companyListForUser) companyListForUser$: any;
  @select((s) => s.company.isLoadingCompanyListForUser) isCompanyListForUserLoading$: any;

  totalRecords!: string;
  page = 1;
  pageSize = 10000;
  count = 0;
  companyList: any = [];
  subscriptions: Subscription[] = [];
  SelectedCompany: any;
  leadId: any;

  userQuery: QueryParamsModel = {
    PageSize: this.pageSize,
    PageNumber: this.page,
  };

  constructor(
    private _companySvc: CompanyService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParams();
    this.getCompanyListForUser();

    let subscription = this.companyListForUser$.subscribe({
      next: (response: any) => {
        console.log('Company List for user', response)
        this.companyList = response?.Items;
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  getParams() {
    this._route.paramMap.subscribe((params: any) => this.leadId = params.get('leadId'))
  }

  getCompanyList() {
    // this._companySvc.LoadCompanyList();
    // this._companySvc.LoadCompaniesForUser();
    // let subscription = this.companyList$.subscribe({
    //   next: (response: any) => {

    //     this.companyList = response;
    //   },
    //   error: (err: any) => {
    //     console.warn('Error: ', err);
    //   },
    // });
    // this.subscriptions.push(subscription);
  }

  getCompanyListForUser() {
    this._companySvc.LoadCompaniesForUser(buildQueryParams(this.userQuery));
    
  }

  onSelectCompany() {
    console.warn('item: ', this.SelectedCompany);
    this._router.navigate(['/recruiter/crm/leads/convert-lead-to-deal/company/', this.leadId,  this.SelectedCompany])

  }

  onAddNewCompanyRoute() {
    this._router.navigate(['/recruiter/crm/leads/convert-lead-to-deal/new-company/', this.leadId])
  }
}
