import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { QueryParamsModel } from 'src/app/models/types/queryParamsModel';
import { IdentityService } from 'src/app/services/identity.service';
import { JobApplicationStageService } from 'src/app/services/job-application-stage.service';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-rejected-list',
  templateUrl: './rejected-list.component.html',
  styleUrls: ['./rejected-list.component.scss'],
})
export class RejectedListComponent implements OnInit {
  @Input('applicantList') applicantList: any;
  vacancyId!: string;
  @Input('CompanyProcesses') CompanyProcesses: any;
  @Input('ZarttechProcesses') ZarttechProcesses: any;
  Applicants: any;
  updatedBy: any;
  rejectedApplicants: any;
  subscriptions: Subscription[] = [];
  page = 1;
  pageSize = 10;
  totalPosts!: number;
  userQuery: QueryParamsModel = {
    PageSize: this.pageSize,
    PageNumber: this.page,
    Status: 'Rejected',
  };

  constructor(
    private _identitySvc: IdentityService,
    private _jobApplicationSvc: JobApplicationService,
    private _jobApplicationStageSvc: JobApplicationStageService,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._jobApplicationSvc.ActiveJobStatusTabSubject.next(3);
    this.getParams();
    this._jobApplicationStageSvc.JobApplicationStageSubject.subscribe({
      next: () => {
        this.getRejectedApplicants();
      },
      error: (err: any) => {
        console.log('Error: ', err);
      },
    });
  }

  getParams() {
    let subscription = this._route.queryParams.subscribe({
      next: (params: any) => {
        // console.log('Params**: ', params);
        this.vacancyId = params['vacancyId'];
        this.getRejectedApplicants();
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
  //     this.rejectedApplicants = this.applicantList.filter(
  //       (applicant: any) => applicant.Status == 'Rejected'
  //     );
  //     // console.log('rejectedApplicants========================>: ', this.rejectedApplicants);
  //   }
  //   // this.onGetInternalProcess();
  // }

  getRejectedApplicants() {
    let subscription = this._jobApplicationSvc
      .GetAllJobApplicationsForVacancy(
        this.vacancyId,
        buildQueryParams(this.userQuery)
      )
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.totalPosts = response?.Data?.TotalSize;
            this.rejectedApplicants = response?.Data?.Items.filter(
              (applicant: any) => !!applicant.Candidate
            );
          }
        },
        error: (err: any) => {
          console.log('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.getRejectedApplicants();
  }

  onGetUpdatedBy() {
    this.updatedBy = this._identitySvc.updatedBy();
    // console.log('updatedBy>>>: ', this.updatedBy);
    return this.updatedBy;
  }

  // onRemoveApplication(){

  // }
}
