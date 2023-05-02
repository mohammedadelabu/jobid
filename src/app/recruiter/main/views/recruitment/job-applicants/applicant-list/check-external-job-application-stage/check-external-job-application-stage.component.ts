import { Component, Input, OnInit } from '@angular/core';
import { JobApplicationStageService } from 'src/app/services/job-application-stage.service';
import { VacancyProcessService } from 'src/app/services/vacancy-process.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-check-external-job-application-stage',
  templateUrl: './check-external-job-application-stage.component.html',
  styleUrls: ['./check-external-job-application-stage.component.scss'],
})
export class CheckExternalJobApplicationStageComponent implements OnInit {
  @select((s) => s.jobBoard.jobDetail) jobDetails$: any;

  @Input('process') process: any;
  @Input('ZarttechProcesses') ZarttechProcesses: any;
  @Input('application') application: any;
  @Input('vacancyId') vacancyId!: string;
  isPassed = false;
  isCurrent = false;
  jobApplicationStageList: any;
  DateCompleted: any;
  vacancyProcessId = '27BBBDFB-6EE8-49EC-A8EE-08DAD4710FF5';
  applicationStagesObject: any;
  processStage_!: number;
  currentProcess: any;
  isLoading = false;
  numberOfStages!: number;

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

  currentStep = 0;

  onNextClick(step: number) {
    if (step === this.steps.length - 1) {
      return;
    }
    const prevSteps = [...this.steps];
    const currStep = prevSteps.find((_, i) => i === step);
    const newStep = prevSteps.find((_, i) => i === step + 1);
    currStep!.status = 'passed';
    newStep!.status = 'current';

    this.steps = prevSteps;
    this.currentStep += 1;
  }

  onPrevClick(step: number) {
    if (step === 0) {
      return;
    }
    const prevSteps = [...this.steps];
    const currStep = prevSteps.find((_, i) => i === step);
    const newStep = prevSteps.find((_, i) => i === step - 1);
    currStep!.status = 'pending';
    newStep!.status = 'current';

    this.steps = prevSteps;
    this.currentStep -= 1;
  }

  constructor(
    private _jobApplicationStageSvc: JobApplicationStageService,
    private toastr: ToastrService,
    private jobAppStage: JobApplicationStageService,
    private _jobVacancySvc: JobVacancyService
  ) {}

  ngOnInit(): void {
    this.onGetJobVacancyById(this.vacancyId);
    // console.log('Process!!!!!!!: ', this.process);
    // console.log('application!!!!!!!!: ', this.application);
    this.getExternalVacancyProcesses();
    // this.onGetApplicationProcessStagebyVacancyProcessIdANDApplicationId(
    //   this.process.Id,
    //   this.application.Id
    // );
    // this.onGetJobApplicationStage();
    this.onGetProcessIndex();
  }

  onGetJobVacancyById(jobVacancyId: string) {
    this._jobVacancySvc.getJobVacancyById(jobVacancyId);
  }

  getExternalVacancyProcesses() {
    this.isLoading = true;
    this.jobDetails$.subscribe({
      next: (res: any) => {
        this.isLoading = false;
        // console.log('Internal Processes', res);
        this.numberOfStages = res?.interviewStages.length;
        this.steps = res?.interviewStages?.map((process: any) => ({
          name: process.Name,
          status: 'pending',
        }));
        // Check if JobApplicationProcessStage exists for Applicant
        this.jobAppStage
          .getApplicationProcessStageByApplicationId(
            this.application.Id,
            'ExternalHiring'
          )
          .subscribe({
            next: (res: any) => {
              this.isLoading = false;
              if (res.ResponseMessage === 'Successful') {
                this.applicationStagesObject = res.Data[0];
                this.processStage_ =
                  this.applicationStagesObject.ExternalHiringProcess + 1;
                const processStage =
                  this.applicationStagesObject.ExternalHiringProcess;
                // console.log('Process Stage', processStage);
                this.steps = this.steps?.map((step, i) => {
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
    this.jobAppStage
      .AddApplicationProcessStage(
        {
          ApplicationId: this.application?.Id,
          VacancyProcessId: this.vacancyProcessId,
        },
        { Status: 'pending', InterviewStageType: 'ExternalHiring' }
      )
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.Mgs === 'JobApplicationProcessStage Added Successfully') {
            this.getExternalVacancyProcesses();
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

  updateExternalApplicantStage() {
    this.isLoading = true;
    this.jobAppStage
      .UpdateExternalApplicantStage(this.applicationStagesObject.Id, {
        ExternalHiringProcess: `Stage${this.processStage_ + 1}`,
        ExternalComment: 'passed',
      })
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.ResponseMessage === 'applicant interview stage updated') {
            this.getExternalVacancyProcesses();
          }
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Error: ', err.error);
        },
      });
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
}
