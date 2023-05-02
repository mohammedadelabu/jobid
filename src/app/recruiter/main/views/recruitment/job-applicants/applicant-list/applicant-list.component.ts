import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { QueryParamsModel } from 'src/app/models/types/queryParamsModel';
import { IdentityService } from 'src/app/services/identity.service';
import {
  InternalProcess,
  InternalProcessService,
} from 'src/app/services/internal-process.service';
import { InterviewProcessService } from 'src/app/services/interview-process.service';
import { JobApplicationStageService } from 'src/app/services/job-application-stage.service';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { VacancyProcessService } from 'src/app/services/vacancy-process.service';
import { ProcessProcessorWidgetComponent } from '../../process-processor-widget/process-processor-widget.component';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss'],
})
export class ApplicantListComponent
  implements OnInit, AfterContentChecked, OnDestroy
{
  // @Input('applicantList') applicantList: any;
  @Input('CompanyProcesses') CompanyProcesses: any;
  @Input('ZarttechProcesses') ZarttechProcesses: any;
  vacancyId!: string;

  // items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  items = [];
  candidateInternalHiringProcess: any;
  candidateExternalHiringProcess: any;
  expandedIndex = 0;
  Applicants: any;
  internalProcessList!: InternalProcess[];
  isProcessStarted!: boolean;
  applicationProcess: any;
  UIProcess: any[] = [];
  updatedBy: any;
  firstZartProcess: any;
  subscriptions: Subscription[] = [];
  page = 1;
  pageSize = 10;
  totalPosts!: number;

  constructor(
    private _route: ActivatedRoute,
    private _interviewProcessSvc: InterviewProcessService,
    private _jobApplicationStageSvc: JobApplicationStageService,
    private _internalProcessSvc: InternalProcessService,
    private _identitySvc: IdentityService,
    private _messengerSvc: MessengerService,
    private _vacancySvc: VacancyProcessService,
    private _jobApplicationSvc: JobApplicationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._jobApplicationSvc.ActiveJobStatusTabSubject.next(0);
    this.getParams();
    // this.getJobApplicants();
    this._jobApplicationStageSvc.JobApplicationStageSubject.subscribe({
      next: () => {
        this.getJobApplicants();
      },
      error: (err: any) => {
        console.log('Error: ', err);
      },
    });
    // console.log('ZarttechProcesses: ', this.ZarttechProcesses);
    // console.log('vacancyId: ', this.vacancyId);
    // this.onGetApplicationProcessStage(this.vacancyId);
    // this.onGetInternalProcess();
    // this.Applicants = this.applicantList;

    // let subscription = this._messengerSvc.getSubject().subscribe({
    //   next: (subjResponse: any) => {
    //     if (subjResponse) {
    //       // this.onGetInternalProcess();
    //       // this.onFetchData();
    //       console.log('subjResponse: ', subjResponse);
    //     }
    //   },
    // });
    // this.subscriptions.push(subscription);
  }

  ngAfterContentChecked() {
    // this.onFetchData();
    // //
    // let subscription1 = this._messengerSvc.getSubject().subscribe({
    //   next: (subjResponse: any) => {
    //     if (subjResponse) {
    //       // this.onGetInternalProcess();
    //       console.log('subjResponse: ', subjResponse);
    //       this.onFetchData();
    //     }
    //   },
    // });
    // this.subscriptions.push(subscription1);
    // let subscription2 = this._jobApplicationSvc
    //   .receiveJobApplicationSubject()
    //   .subscribe({
    //     next: (response: any) => {
    //       if (response) {
    //         console.log('rsponse******: ', response);
    //         this.onFetchData();
    //       }
    //     },
    //   });
    // this.subscriptions.push(subscription2);
  }

  getJobApplicants() {
    let userQuery = { pageSize: this.pageSize, pageNumber: this.page };
    let subscription = this._jobApplicationSvc
      .GetAllJobApplicationsForVacancy(
        this.vacancyId,
        buildQueryParams(userQuery)
      )
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.totalPosts = response?.Data?.TotalSize;
            this.Applicants = response?.Data?.Items.filter(
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
    console.log('Eveent', event);
    this.page = event;
    this.getJobApplicants();
  }

  onGetUpdatedBy() {
    this.updatedBy = this._identitySvc.updatedBy();
    // console.log('updatedBy>>>: ', this.updatedBy);
    return this.updatedBy;
  }

  // onFetchData() {
  //   if (this.ZarttechProcesses) {
  //     this.firstZartProcess = this.ZarttechProcesses[0];
  //   }
  //   // console.log('vacancyId: ', this.vacancyId);
  //   // console.log('applicantList>>>>>>>>>>>>: ', this.applicantList);
  //   if (this.applicantList) {
  //     this.Applicants = this.applicantList.filter(
  //       (applicant: any) => !!applicant.Candidate
  //     );
  //     // ?.filter(
  //     //   (application: any) =>
  //     //     application.Status != 'Rejected' &&
  //     //     application.Status != 'Shortlisted' &&
  //     //     application.Status != 'Hired'
  //     // );
  //     return this.Applicants;
  //   }
  //   // console.log('applicantList>>>>>>>>>>>>: ', this.Applicants);
  //   // this.onGetInternalProcess();
  // }

  receiveEvent($event: boolean) {
    this.isProcessStarted = $event;
    // console.log('this.isProcessStarted??????????????: ', this.isProcessStarted);
  }

  getParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        // console.log('Params**: ', params);
        this.vacancyId = params.get('JobId');
        this.getJobApplicants()
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onShortlistApplication(application: any) {
    // console.log('Shortlist: ', application);
    const Payload = {
      status: 'Shortlisted',
      applicationID: application.Id,
      updatedBy: this.onGetUpdatedBy(),
    };
    // console.log('Update Shortlist: ', Payload);
    let subscription = this._jobApplicationSvc
      .UpdateApplicationStatus(Payload)
      .subscribe({
        next: (response: any) => {},
        error: (err: any) => {},
      });
    this.subscriptions.push(subscription);
  }

  // onGetJobHiringProcess(JobId: string) {
  //   this._interviewProcessSvc.getInterviewProcesses(JobId).subscribe({
  //     next: (response: any) => {
  //       if (response.ResponseCode == '00') {
  //         console.log('getExternalCandidateHiringProcess: ', response);
  //         this.candidateExternalHiringProcess = response?.Data;
  //       }
  //     },
  //     error: (err: any) => {
  //       console.warn('Error: ', err);
  //     },
  //   });
  // }

  onGetApplicationProcessStage(vacancyId: string) {
    let subscription = this._jobApplicationStageSvc
      .getApplicationProcessStageByvacancyId(vacancyId)
      .subscribe({
        next: (response: any) => {
          if (response.ResponseCode == '00') {
            // console.log(
            //   'getApplicationProcessStageByvacancyId: ',
            //   response,
            //   this.ZarttechProcesses
            // );
            this.applicationProcess = response?.Data;
            this.onMergeProcesses(response?.Data, this.ZarttechProcesses);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onMergeProcesses(ApplicationProcess: any[], CompanyProcesses: any[]) {
    this.UIProcess;
    // let x: any = [];

    CompanyProcesses?.forEach((process: any) => {
      // let x = ApplicationProcess.filter(
      //   (appProcess: any) => {
      //     process.Id === appProcess.VacancyId;
      //     console.log("process.Id === appProcess.VacancyId: ", process.Id)
      //     console.log("process.Id === appProcess.VacancyId: ", appProcess.VacancyId)
      //   }
      // );
      // this.UIProcess = x[0];
      // console.log('this.UIProcess>>>>>: ', this.UIProcess);
    });
    // for (let i = 0; i < ApplicationProcess.length; i++) {
    //   let x = CompanyProcesses.filter(
    //     (process: any) => ApplicationProcess[i].VacancyProcessId === process.Id
    //   );
    //   // let y = CompanyProcesses.filter(
    //   //   (process: any) => ApplicationProcess[i].VacancyProcessId === process.Id
    //   // );
    //   console.log('xxxxxxxxxxxxxxxxxxxxxxxx: ', x);
    //   this.UIProcess.push(x[0]);
    //   // this.UIProcess.push(y[0]);
    // console.log('this.UIProcess>>>>>: ', this.UIProcess);
    // }

    // const newData = {
    //   Name: x[0]?.Name,
    //   DateCompleted: x[0]?.DateCompleted,
    //   Successful: false,
    //   UpdatedBy: '',
    // };
    //
    // this._vacancySvc.updateVacancyProcess(newData, x[0]?.Id).subscribe({
    //   next: (response: any) => {
    //     if (response.ResponseCode == '00') {
    //       console.log('updateVacancyProcess response: ', response);
    //     }
    //   },
    //   error: (err: any) => {
    //     console.warn('Error: ', err);
    //   },
    // });
  }

  onOpenDialog(Process: any, Item: any) {
    // console.log('Hello world! => Process', Process);
    // console.log('Hello world! => Item', Item);
    const Payload: any = {
      applicationId: Item?.Id,
      vacancyProcessId: Process?.Id,
      userid: Item?.Candidate.Id,
    };

    // this.onGetApplicationProcessStage(Payload);
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

    let subscription = dialogRef.afterClosed().subscribe((result) => {});
    this.subscriptions.push(subscription);
  }

  // onGetApplicationProcessStage(VacancyProcessId: string) {
  //   console.log('VacancyProcessId: ', VacancyProcessId);
  // }

  // onGetApplicationProcessStage(Process: any) {
  //   console.log('ProcessStage: ', Process);
  //   this._jobApplicationStageSvc
  //     .GetApplicationProcessStageByApplicationId(Process?.vacancyProcessId)
  //     .subscribe({
  //       next: (response: any) => {
  //
  //       },
  //       error: (err: any) => {
  //         console.warn('Error: ', err);
  //       },
  //     });
  // }

  // onGetInternalProcess() {
  //   this.internalProcessList =
  //     this._internalProcessSvc.getInternalProcessList();
  //   console.log('this.internalProcessList: ', this.internalProcessList);
  // }

  // onScheduleInterview(Applicant: any) {
  //   console.log('Applicant: ', Applicant);
  //   let thisProcess = this.internalProcessList.filter(
  //     (process: any) => process.Id === 1
  //   );
  //   const Payload = {
  //     email: Applicant.Email,
  //     status: thisProcess[0]?.Name,
  //     statusComment: '',
  //   };

  //
  //   this._identitySvc.updateStatusAndComment(Payload).subscribe({
  //     next: (response: any) => {
  //       if (response) {
  //
  //         this.onGetInternalProcess();
  //         this.text();
  //         this._messengerSvc.sendSubject('Moved!');
  //         location.reload();
  //       }
  //     },
  //     error: (err: any) => {
  //       console.warn('Error: ', err);
  //     },
  //   });
  // }

  onNextInterviewProcess(Application: any) {
    // console.log('Application: ', Application);
    for (let i = 0; i < this.ZarttechProcesses.length; i++) {
      console.log('this.ZarttechProcesses: ', this.ZarttechProcesses[i].Name);
    }
  }

  // text() {
  //   console.log(
  //     'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTEEEEEEEEEEEESSSSSSSSSSTTTTTT!!!!!!!!'
  //   );
  // }

  onGetZarttechProcess() {}

  onScheduleInterview(Application: string, ZarttechProcesses: any) {
    // console.log(`Application: `, Application);
    // console.log(`ZarttechProcesses: `, ZarttechProcesses);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
