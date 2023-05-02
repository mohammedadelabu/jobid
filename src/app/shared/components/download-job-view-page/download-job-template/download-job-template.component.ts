import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { DownloadJobService } from 'src/app/services/download-job.service';
import { IdentityService } from 'src/app/services/identity.service';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';

@Component({
  selector: 'app-download-job-template',
  templateUrl: './download-job-template.component.html',
  styleUrls: ['./download-job-template.component.scss'],
})
export class DownloadJobTemplateComponent implements OnInit, OnDestroy {
  @Input('isUndisclosed') isUndisclosed!: boolean;
  JobDetails: any;
  CompanyDetails: any;
  JobSkills: any;
  companyContactList: any;
  jobId: any;
  loggedInUser: any;
  companyId: any;
  subscriptions: Subscription[] = [];

  constructor(
    private _jobVacancySvc: JobVacancyService,
    private _identitySvc: IdentityService,
    private _route: ActivatedRoute,
    private _JobApplicationSvc: JobApplicationService,
    private _companySvc: CompanyService,
    private _downloadJobSvc: DownloadJobService
  ) {}

  ngOnInit(): void {
    this.onGet_CompanyId_JobId();
  }

  onGet_CompanyId_JobId() {
    // this.getParams();
    let Params = this._downloadJobSvc.getJobTemplateParams();
    this.onGetJobVacanciesByCompany(Params?.CompanyId, Params?.JobId);
  }

  onGetJobVacanciesByCompany(companyId: string, jobId: string) {
    this.onGetCompanyDetails(companyId);
    let subscription = this._jobVacancySvc
      .getJobVacanciesByCompany(companyId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            let job = response.Data.filter((job: any) => job.Id === jobId);
            this.onGetJobDetails(job[0]);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onGetJobDetails(Job: any) {
    this.JobDetails = Job;
    let JobSkills = JSON.parse(Job?.Body);
    this.JobSkills = JobSkills;
  }

  onGetCompanyDetails(companyId: string) {
    let subscription = this._companySvc.getCompanyDetails(companyId).subscribe({
      next: (response: any) => {
        if (response) {
          if (response.ResponseCode == '00') {
            this.CompanyDetails = response.Data;
          }
        }
      },
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
