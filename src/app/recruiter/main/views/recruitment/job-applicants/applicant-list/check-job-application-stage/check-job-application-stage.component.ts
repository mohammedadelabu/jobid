import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { JobApplicationStageService } from 'src/app/services/job-application-stage.service';
import { VacancyProcessService } from 'src/app/services/vacancy-process.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-check-job-application-stage',
  templateUrl: './check-job-application-stage.component.html',
  styleUrls: ['./check-job-application-stage.component.scss'],
})
export class CheckJobApplicationStageComponent implements OnInit, OnDestroy {
  @Input('process') process: any;
  @Input('ZarttechProcesses') ZarttechProcesses: any;
  @Input('application') application: any;
  isPassed = false;
  isCurrent = false;
  jobApplicationStageList: any;
  DateCompleted: any;
  vacancyProcessId = 'DEF3E2F6-C927-4D39-A8ED-08DAD4710FF5';
  applicationStagesObject: any;
  processStage_!: number;
  currentProcess: any;
  isLoading = false;
  numberOfStages!: number;
  subscriptions: Subscription[] = [];
  updatedBy: any;

  // Testing
  steps: { name: string; href?: string; status: string }[] = [
    { name: 'Project details', href: '#', status: 'current' },
    { name: 'Project Guidelines', href: '#', status: 'pending' },
    { name: 'Delivery Validation', href: '#', status: 'pending' },
    { name: 'Test 4', href: '#', status: 'pending' },
    { name: 'Test 5', href: '#', status: 'pending' },
    { name: 'Test 6', href: '#', status: 'pending' },
    // { name: "Step 4", href: "#", status: "upcoming" },
    // { name: "Step 5", href: "#", status: "upcoming" },
  ];

  constructor(
    private _jobApplicationStageSvc: JobApplicationStageService,
    private vacancyProcess: VacancyProcessService,
    private toastr: ToastrService,
    private _jobApplicationSvc: JobApplicationService,
    private _identitySvc: IdentityService
  ) {}

  ngOnInit(): void {
    // console.log('Process!!!!!!!: ', this.process);
    // console.log('application!!!!!!!!: ', this.application);
    this.getInternalVacancyProcesses();
    // this.onGetApplicationProcessStagebyVacancyProcessIdANDApplicationId(
    //   this.process.Id,
    //   this.application.Id
    // );
    // this.onGetJobApplicationStage();
    this.onGetProcessIndex();
  }

  getInternalVacancyProcesses() {
    this.isLoading = true;
    this.vacancyProcess
      .getVacancyProcess(environment.internalVacancyId)
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.numberOfStages = res?.Data?.length;
          // console.log('Internal Processes', res);
          this.steps = res?.Data?.map((process: any) => ({
            name: process.vacancyProcessName,
            status: 'pending',
          }));
          // Check if JobApplicationProcessStage exists for Applicant
          this._jobApplicationStageSvc
            .getApplicationProcessStageByApplicationId(
              this.application.Id,
              'InternalHiring'
            )
            .subscribe({
              next: (res: any) => {
                this.isLoading = false;
                if (res.ResponseMessage === 'Successful') {
                  this.applicationStagesObject = res.Data[0];
                  this.processStage_ =
                    this.applicationStagesObject.InternalHiringProcess + 1;
                  // console.log('Process Stage', this.processStage_)
                  const processStage =
                    this.applicationStagesObject.InternalHiringProcess;
                  if (processStage === 6) {
                    this.onHireApplication();
                  }
                  // console.log('Process Stage', processStage);
                  this.steps = this.steps.map((step, i) => {
                    if (i < processStage) {
                      step.status = 'passed';
                    } else if (i === processStage) {
                      step.status = 'current';
                      this.currentProcess = step.name;
                    } else {
                      step.status = 'pending';
                    }
                    return step;
                  });
                } else if (
                  res.ResponseMessage === 'JobApplicationProcessStage Not Found'
                ) {
                  this.createJobApplicationStageifNotExists();
                }
              },
              error: (err: any) => {
                this.isLoading = false;
                console.error('Error', err);
              },
            });
          // Create Job Application Stages Object if not any
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Error', err);
          this.toastr.error(err?.response?.message || 'An error occurred');
        },
      });
  }

  createJobApplicationStageifNotExists() {
    this.isLoading = true;
    this._jobApplicationStageSvc
      .AddApplicationProcessStage(
        {
          ApplicationId: this.application?.Id,
          VacancyProcessId: this.vacancyProcessId,
        },
        { Status: 'pending', InterviewStageType: 'InternalHiring' }
      )
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.Mgs === 'JobApplicationProcessStage Added Successfully') {
            this.getInternalVacancyProcesses();
          }
          // console.log('Job App Stages', res);
        },
        error: (err: any) => {
          this.isLoading = false;
          // const errorMsg = 'Application already in this process stage'
          console.error('Error: ', err.error);
        },
      });
  }

  updateInternalApplicantStage() {
    this.isLoading = true;
    this._jobApplicationStageSvc
      .UpdateInternalApplicantStage(this.applicationStagesObject.Id, {
        InternalHiringProcess: `Stage${this.processStage_ + 1}`,
        InternalComment: 'passed',
      })
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.ResponseMessage === 'applicant interview stage updated') {
            this.toastr.success('Candidate successfully moved to next stage');
            this.getInternalVacancyProcesses();
          }
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Error: ', err.error);
        },
      });
  }

  onHireApplication() {
    this.isLoading = true;
    // console.log('Shortlist: ', application);
    const Payload = {
      status: 'Hired',
      applicationID: this.application.Id,
      updatedBy: this.onGetUpdatedBy(),
    };
    // console.log('Update Shortlist: ', Payload);
    let subscription = this._jobApplicationSvc
      .UpdateApplicationStatus(Payload)
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response) {
            // console.log('response: ', response);
            this.application.Status = 'Hired';
            // this.toastr.success('Candidate is hired');
            this._jobApplicationStageSvc.sendJobApplicationStageSubject(
              'Hired!'
            );
          }
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Error', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onGetUpdatedBy() {
    this.updatedBy = this._identitySvc.updatedBy();
    // console.log('updatedBy>>>: ', this.updatedBy);
    return this.updatedBy;
  }

  // onGetJobApplicationStage() {
  //   this._jobApplicationStageSvc
  //     .getApplicationProcessStageByApplicationId(this.application.Id)
  //     .subscribe({
  //       next: (response: any) => {
  //         if (response.ResponseCode == '00') {
  //           // console.log('onGetJobApplicationStage: ', response);
  //           this.jobApplicationStageList = response?.Data;
  //           // this.onFindProcess(this.jobApplicationStageList);
  //         }
  //       },
  //       error: (err: any) => {
  //         console.warn('Error: ', err);
  //       },
  //     });
  // }

  // onFindProcess(StageList: any) {
  //   let foundProcess = StageList.filter((vacancyProcess: any) => {
  //     // vacancyProcess.VacancyId == this.process.VacancyId
  //     // console.log('foundProcess? vacancyProcess.VacancyId: ', vacancyProcess.ApplicationId);
  //     // console.log('foundProcess? this.process.VacancyId: ', this.process.VacancyId);
  //   });
  //   // console.log('foundProcess: ', foundProcess);
  //   if (foundProcess.length) {
  //     this.isCurrent = true;
  //   }
  // }

  onGetApplicationProcessStagebyVacancyProcessIdANDApplicationId(
    VacancyProcessId: string,
    ApplicationId: string
  ) {
    this._jobApplicationStageSvc
      .GetApplicationProcessStagebyVacancyProcessIdANDApplicationId(
        VacancyProcessId,
        ApplicationId
      )
      .subscribe({
        next: (response: any) => {
          //
          if (response.ResponseCode == '00') {
            this.DateCompleted = response?.Data[0].DateCompleted;
            this.isPassed = true;
            // console.log('this.isCurrent : ', this.isCurrent);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
  }

  onGetProcessIndex() {
    // console.log('Index: ', this.ZarttechProcesses.indexOf(this.process));
    // let x = this.ZarttechProcesses.indexOf(this.process);
    // let y = x + 1;
    // if (y < this.ZarttechProcesses.length) {
    //   this.isPassed = true;
    // }else{
    //   this.isPassed = false;
    // }
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
