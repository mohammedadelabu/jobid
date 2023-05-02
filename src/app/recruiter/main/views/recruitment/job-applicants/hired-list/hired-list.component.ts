import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { QueryParamsModel } from 'src/app/models/types/queryParamsModel';
import { IdentityService } from 'src/app/services/identity.service';
import { JobApplicationStageService } from 'src/app/services/job-application-stage.service';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-hired-list',
  templateUrl: './hired-list.component.html',
  styleUrls: ['./hired-list.component.scss'],
})
export class HiredListComponent implements OnInit, OnDestroy {
  @Input('applicantList') applicantList: any;
  vacancyId!: string;
  @Input('CompanyProcesses') CompanyProcesses: any;
  @Input('ZarttechProcesses') ZarttechProcesses: any;
  Applicants: any;
  updatedBy: any;
  hiredApplicants: any;
  subscriptions: Subscription[] = [];
  page = 1;
  pageSize = 10;
  totalPosts!: number;
  isLoading = false;
  userQuery: QueryParamsModel = {
    PageSize: this.pageSize,
    PageNumber: this.page,
    Status: 'Hired',
  };

  constructor(
    private _identitySvc: IdentityService,
    private _jobApplicationSvc: JobApplicationService,
    private _route: ActivatedRoute,
    private _jobApplicationStageSvc: JobApplicationStageService
  ) {}

  ngOnInit(): void {
    this._jobApplicationSvc.ActiveJobStatusTabSubject.next(2);
    this.getParams();
    this._jobApplicationStageSvc.JobApplicationStageSubject.subscribe({
      next: () => {
        this.getHiredApplicants();
      },
      error: (err: any) => {
        console.log('Error: ', err);
      },
    });
  }

  getParams() {
    let subscription = this._route.queryParams.subscribe({
      next: (params) => {
        // console.log('Params**: ', params);
        this.vacancyId = params['vacancyId'];
        this.getHiredApplicants();
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  // ngAfterContentChecked() {
  //   if (this.applicantList) {
  //     this.Applicants = this.applicantList;
  //     // console.log('applicantList: ', this.applicantList);
  //     this.hiredApplicants = this.applicantList.filter((applicant:any)=>applicant.Status == 'Hired');
  //     // console.log('hiredApplicants: ', this.hiredApplicants);
  //   }
  //   // this.onGetInternalProcess();
  // }

  getHiredApplicants() {
    this.isLoading = true;
    let subscription = this._jobApplicationSvc
      .GetAllJobApplicationsForVacancy(
        this.vacancyId,
        buildQueryParams(this.userQuery)
      )
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response) {
            this.totalPosts = response?.Data?.TotalSize;
            this.hiredApplicants = response?.Data?.Items.filter(
              (applicant: any) => !!applicant.Candidate
            );
          }
        },
        error: (err: any) => {
          this.isLoading = false;
          console.log('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onGetUpdatedBy() {
    this.updatedBy = this._identitySvc.updatedBy();
    // console.log('updatedBy>>>: ', this.updatedBy);
    return this.updatedBy;
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.getHiredApplicants();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
