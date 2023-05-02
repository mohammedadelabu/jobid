import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { DownloadJobService } from 'src/app/services/download-job.service';
import { IdentityService } from 'src/app/services/identity.service';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';
import { AddCompanyProcessComponent } from '../job-interview-process/add-company-process/add-company-process.component';
import { EditCompanyProcessComponent } from '../job-interview-process/edit-company-process/edit-company-process.component';
import { AddJobQuestionComponent } from '../job-questions/add-job-question/add-job-question.component';
import { QuestionBase } from '../job-questions/model/question-base.model';
// import { QuestionService } from '../job-questions/service/question.service';
import { AddInterviewProcessComponent } from '../post-job/add-interview-process/add-interview-process.component';
import { ApplyForJobComponent } from './apply-for-job/apply-for-job.component';
import { MultiApplicationRequestComponent } from './multi-application-request/multi-application-request.component';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  @select((s) => s.jobBoard.jobDetail) jobDetails$: any;

  number: Number = 4;
  JobDetails: any;
  CompanyDetails: any;
  JobSkills: any;
  JobLanguages: any;
  companyContactList: any;
  jobId: any;
  loggedInUser: any;
  companyId: any;
  subscriptions: Subscription[] = [];
  // questions$: Observable<QuestionBase<any>[]>;
  constructor(
    public dialog: MatDialog,
    private _route: ActivatedRoute,
    private _jobVacancySvc: JobVacancyService,
    private _identitySvc: IdentityService,
    private _JobApplicationSvc: JobApplicationService,
    private _companySvc: CompanyService,
    private _downloadJobSvc: DownloadJobService,
    private _router: Router // private _questionSvc: QuestionService
  ) {
    // this.questions$ = _questionSvc.getJobQuestionFields();
  }

  ngOnInit(): void {
    this.getParams();
    this.getLoggedInUser();

    let subscription = this.jobDetails$.subscribe({
      next: (response: any) => {
        // console.log('New Job Details', response.Data);
        this.JobDetails = response;
        let JobSkills = response?.jobSkills.map(
          (skill: any) => skill.SkillName
        );
        let JobLanguages = response?.jobVacancyLanguages
          .map((l: any) => l.Language)
          .join(', ');
        this.JobSkills = JobSkills;
        this.JobLanguages = JobLanguages;
        // console.log('Job.Skills: ', JobSkills);
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });

    this.subscriptions.push(subscription);
  }

  getLoggedInUser() {
    this.loggedInUser = this._identitySvc.getLoggedInUserData();
  }

  openEditProcessDialog() {
    const dialogRef = this.dialog.open(EditCompanyProcessComponent, {
      width: '700px',
      restoreFocus: false,
      data: {
        existingProcesses: this.JobDetails.interviewStages,
        jobId: this.jobId,
      },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: `, result);
    });
    this.subscriptions.push(subscription);
  }

  openAddProcessDialog(data: any) {
    const dialogRef = this.dialog.open(AddCompanyProcessComponent, {
      width: '650px',
      data: {
        // companyId: data,
        vacancyId: data,
      },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {});
    this.subscriptions.push(subscription);
  }

  openAddJobQuestionDialog(data: any) {
    const dialogRef = this.dialog.open(AddJobQuestionComponent, {
      width: '650px',
      data: {
        // companyId: data,
        vacancyId: data,
        // jobQuestions: this.questions$,
      },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {});
    this.subscriptions.push(subscription);
  }

  getParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        if (params) {
          this.companyId = params.get('companyId');
          this.jobId = params.get('jobId');
          let jobId = params.get('jobId');
          console.log('companyId Params: ', this.companyId);
          this.onGetJobVacancyById(jobId);
          this.onGetJobVacanciesByCompany(this.companyId, jobId);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetJobVacanciesByCompany(companyId: string, jobId: string) {
    this.onGetCompanyDetails(companyId);
    this.onGetCompanyContacts(companyId);
    // let subscription = this._jobVacancySvc
    //   .getJobVacanciesByCompany(companyId)
    //   .subscribe({
    //     next: (response: any) => {
    //       console.log('getJobVacanciesByCompany response: ', response);
    //       if (response) {
    //         let job = response.Data.filter((job: any) => job.Id === jobId);
    //         this.onGetJobDetails(job[0]);
    //       }
    //     },
    //     error: (err: any) => {
    //       console.warn('Error: ', err);
    //     },
    //   });
    // this.subscriptions.push(subscription);
  }

  // onGetJobDetails(Job: any) {
  //   console.log('Job Details: ', Job);
  //   this.JobDetails = Job;
  //   let JobSkills = JSON.parse(Job?.Body);
  //   this.JobSkills = JobSkills;
  //   console.log('Job.Skills: ', JobSkills);
  // }

  onGetJobVacancyById(jobVacancyId: string) {
    this._jobVacancySvc.getJobVacancyById(jobVacancyId);
  }

  onGetCompanyDetails(companyId: string) {
    let subscription = this._companySvc.getCompanyDetails(companyId).subscribe({
      next: (response: any) => {
        if (response) {
          // console.log('CompanyDetails: ', response);
          if (response.ResponseCode == '00') {
            this.CompanyDetails = response.Data;
          }
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetCompanyContacts(companyId: string) {
    let subscription = this._companySvc
      .getCompanyContacts(companyId)
      .subscribe({
        next: (response: any) => {
          // console.log('company contacts response: ', response);
          if (response) {
            if (response.ResponseCode == '00') {
              this.companyContactList = response.Data;
            }
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onApplyForJob() {
    // console.log('loggedInUser: ', this.loggedInUser);
    // console.log('jobId: ', this.jobId);
    // const Payload = {
    //   VacancyId:this.jobId,
    //   CandidateId: this.loggedInUser.Id,
    // };
    // console.log('Application Payload: ', Payload);
    // this._JobApplicationSvc.postApplication(Payload).subscribe({
    //   next: (response: any) => {
    //
    //   },
    //   error: (err: any) => {
    //     console.warn('Error: ', err);
    //   },
    // });
  }

  onOpenApplyForJobDialog(JobId: string) {
    const dialogRef = this.dialog.open(ApplyForJobComponent, {
      width: '100%',
      maxWidth: '600px',
      data: {
        JobId: JobId,
      },
    });
    let subscription = dialogRef.afterClosed().subscribe((result) => {});
    this.subscriptions.push(subscription);
  }

  onOpenMultiSelectApplicationDialog() {
    const dialogRef = this.dialog.open(MultiApplicationRequestComponent, {
      width: '100%',
      maxWidth: '600px',
      height: '600px',
      // data: {
      //   JobId: JobId,
      // },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {});
    this.subscriptions.push(subscription);
  }

  onDownloadJob() {
    // this._downloadJobSvc.setJobDownloadCompanyId(this.companyId);
    // this._downloadJobSvc.setJobDownloadJobId(this.jobId);
    this._downloadJobSvc.setJobTemplateParams(this.companyId, this.jobId);
    this._router.navigate([
      `/recruiter/employee-management/job-board/download-job/${this.companyId}/${this.jobId}`,
    ]);
    // [routerLink]="['/recruiter/employee-management/job-board/share-job/',CompanyDetails?.CompanyId, JobDetails?.Id]" routerLinkActive="router-link-active"
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
