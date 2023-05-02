import { select } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { QueryParamsModel } from 'src/app/models/types/queryParamsModel';
import { IdentityService } from 'src/app/services/identity.service';
import { JobApplicationStageService } from 'src/app/services/job-application-stage.service';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';
import { ProcessProcessorWidgetComponent } from '../../process-processor-widget/process-processor-widget.component';

@Component({
  selector: 'app-shortlisted-list',
  templateUrl: './shortlisted-list.component.html',
  styleUrls: ['./shortlisted-list.component.scss'],
})
export class ShortlistedListComponent implements OnInit, OnDestroy {
  @select((s) => s.jobBoard.jobDetail) jobDetails$: any;

  // @Input('applicantList') applicantList: any;
  vacancyId!: string;
  @Input('CompanyProcesses') CompanyProcesses: any;
  @Input('ZarttechProcesses') ZarttechProcesses: any;
  items = ['Item 1', 'Item 2'];
  Applicants: any;
  updatedBy: any;
  shortlistedApplicants: any;
  firstZartProcess: any;
  isProcessStarted!: boolean;
  subscriptions: Subscription[] = [];
  page = 1;
  pageSize = 10;
  totalPosts!: number;
  JobDetails: any;
  jobQuestions: any;
  isLoading = false;
  hiringType!: number;

  constructor(
    private _route: ActivatedRoute,
    private _identitySvc: IdentityService,
    private _jobApplicationSvc: JobApplicationService,
    private _jobVacancySvc: JobVacancyService,
    private _jobApplicationStageSvc: JobApplicationStageService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this._jobApplicationSvc.ActiveJobStatusTabSubject.next(1);
    this.getParams();

    let subscription1 =
      this._jobApplicationStageSvc.JobApplicationStageSubject.subscribe({
        next: () => {
          this.getShortlistedApplicants();
        },
        error: (err: any) => {
          console.log('Error: ', err);
        },
      });

    let subscription2 = this.jobDetails$.subscribe({
      next: (response: any) => {
        // console.log('New Job Details', response.Data);
        this.JobDetails = response;
        const jobQuestions = response?.jobQuestion;
        this.hiringType = response?.InterviewProcessType;
        this.jobQuestions = jobQuestions?.map((jQ: any) => {
          return {
            ...jQ,
            isMultipleChoice: jQ.questionOptions.some(
              (q: any) => q.OptionName !== ''
            ),
          };
        });
        console.log('Job Questions: ', this.jobQuestions);
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });

    this.subscriptions.push(subscription1);
    this.subscriptions.push(subscription2);
  }

  getParams() {
    let subscription = this._route.queryParams.subscribe({
      next: (params) => {
        console.log('Params**: ', params);
        this.vacancyId = params['vacancyId'];
        console.log('Vacancyid', this.vacancyId);
        this.onGetJobVacancyById(this.vacancyId);
        this.getShortlistedApplicants();
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetJobVacancyById(jobVacancyId: string) {
    this._jobVacancySvc.getJobVacancyById(jobVacancyId);
  }

  // ngAfterContentChecked() {
  //   // if (this.applicantList) {
  //   //   this.Applicants = this.applicantList;
  //   //   // console.log('applicantList: ', this.applicantList);
  //   //   this.shortlistedApplicants = this.applicantList.filter(
  //   //     (applicant: any) => applicant.Status == 'Shortlisted'
  //   //   );
  //   //   // console.log('shortlistedApplicants: ', this.shortlistedApplicants);
  //   // }
  //   // this.onGetInternalProcess();
  // }

  receiveEvent($event: boolean) {
    this.isProcessStarted = $event;
    // console.log('this.isProcessStarted??????????????: ', this.isProcessStarted);
  }

  openProcessorDialog(Application: any, ZarttechProcesses: any) {
    const dialogRef = this.dialog.open(ProcessProcessorWidgetComponent, {
      width: '100%',
      maxWidth: '600px',
      data: {
        ZarttechProcesses: ZarttechProcesses,
        application: Application,
      },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    this.subscriptions.push(subscription);
  }

  getShortlistedApplicants() {
    this.isLoading = true;
    let userQuery: QueryParamsModel = {
      PageSize: this.pageSize,
      PageNumber: this.page,
      Status: 'Shortlisted',
    };
    let subscription = this._jobApplicationSvc
      .GetAllJobApplicationsForVacancy(
        this.vacancyId,
        buildQueryParams(userQuery)
      )
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response) {
            this.totalPosts = response?.Data?.TotalSize;
            this.shortlistedApplicants = response?.Data?.Items.filter(
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

  pageChangeEvent(event: number) {
    this.page = event;
    this.getShortlistedApplicants();
  }

  onGetUpdatedBy() {
    this.updatedBy = this._identitySvc.updatedBy();
    // console.log('updatedBy>>>: ', this.updatedBy);
    return this.updatedBy;
  }

  onSubmit(form: NgForm, application: any) {
    const response = Object.entries(form.value).map((entry: any) => {
      return {
        Answer: entry[0],
        Question: entry[1],
      };
    });
    const payload = {
      JobApplicationId: application.Id,
      ApplicantId: application.CandidateId,
      jobApplicationAnswerDtos: response,
    };

    this.isLoading = true;
    this._jobApplicationSvc.AddJobApplicationQuestionAnswer(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.toastr.success('Answers saved successfully');
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error('Error', err);
        this.toastr.error('An error occurred');
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
