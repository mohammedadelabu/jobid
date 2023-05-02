import { select } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, OnDestroy {
  @Input() pagedJobVacancyList: any;
  @Input() page!: number;
  @Input() pageSize!: number;
  @Input() totalPosts!: number;
  @Output() selectPage = new EventEmitter<number>();
  @select((s) => s.companyList.companyList) companyList$: any;
  @select((s) => s.companyList.isLoading) isLoading$: any;
  placementList = [1, 2, 3];
  CompanyList: any;
  JobVacancyList: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _CompanySvc: CompanyService,
    private _jobVacancySvc: JobVacancyService
  ) {}

  ngOnInit(): void {
    // this.getCompanyList();
    // this.getAllJobVancancyList();
  }

  getAllJobVancancyList() {
    let subscription = this._jobVacancySvc.getJobVacancies().subscribe({
      next: (response: any) => {
        if (response) {
          console.log('JobVacancyList: ', response);
          this.JobVacancyList = response?.Data;
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

  getJobVacancyListByCompany(CompanyId: string) {
    let subscription = this._jobVacancySvc
      .getJobVacanciesByCompany(CompanyId)
      .subscribe({
        next: (response: any) => {
          console.log('JobVacancyList: ', response);
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  pageChangeEvent(event: number) {
    this.selectPage.emit(event);
    // this.page = event;
    // this.onGetPagedJobVacancies();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('JOB_SKILLS');
    localStorage.removeItem('Interview_Processes');
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
