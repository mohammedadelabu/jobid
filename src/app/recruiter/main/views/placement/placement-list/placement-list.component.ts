import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { CompanyService } from 'src/app/services/company.service';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';

@Component({
  selector: 'app-placement-list',
  templateUrl: './placement-list.component.html',
  styleUrls: ['./placement-list.component.scss'],
})
export class PlacementListComponent implements OnInit {
  @select((s) => s.companyList.companyList) companyList$: any;
  listCandidateCards = true;
  CompanyList: any;
  subscriptions: Subscription[] = [];
  page = 1;
  pageSize = 10;
  totalPosts!: number;
  pagedJobVacancyList: any;

  constructor(
    private _CompanySvc: CompanyService,
    private _jobVacancySvc: JobVacancyService
  ) {}

  ngOnInit(): void {
    this.getCompanyList();
    this.onGetPagedJobVacancies();
  }

  onGetPagedJobVacancies() {
    let userQuery = { pageSize: this.pageSize, pageNumber: this.page };
    let subscription = this._jobVacancySvc
      .getPagedJobVacancies(buildQueryParams(userQuery))
      .subscribe({
        next: (response: any) => {
          console.log('Paged Job Vacancies: ', response.Data);
          if (response) {
            this.totalPosts = response.Data.TotalSize;
            this.pagedJobVacancyList = response.Data.Items;
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  getCompanyList() {
    this._CompanySvc.LoadCompanyList();
    let subscription = this.companyList$.subscribe({
      next: (response: any) => {
        if (response) {
          this.CompanyList = response?.Data;
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.onGetPagedJobVacancies();
  }

  toggleCards() {
    console.log('starts!!!');
    this.listCandidateCards = !this.listCandidateCards;
    console.log('ends!!!');
  }
}
