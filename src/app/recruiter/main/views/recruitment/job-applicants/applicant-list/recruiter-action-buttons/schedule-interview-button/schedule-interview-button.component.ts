import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IdentityService } from 'src/app/services/identity.service';
import { JobApplicationStageService } from 'src/app/services/job-application-stage.service';

@Component({
  selector: 'app-schedule-interview-button',
  templateUrl: './schedule-interview-button.component.html',
  styleUrls: ['./schedule-interview-button.component.scss'],
})
export class ScheduleInterviewButtonComponent implements OnInit, OnDestroy {
  @Input('application') application: any;
  // @Input('ZarttechProcesses') ZarttechProcesses: any;
  @Input('firstZartProcess') firstZartProcess: any;
  @Output() processStartedEvent = new EventEmitter<boolean>();
  updatedBy: any;
  isProcessStarted!: boolean;
  isDone!: boolean;
  subscriptions: Subscription[] = [];
  constructor(
    private _jobApplicationStageSvc: JobApplicationStageService,
    private _identitySvc: IdentityService
  ) {}

  ngOnInit(): void {
    // console.log('application: ', this.application);
    console.log('firstZartProcess: ', this.firstZartProcess);
    // this.onGetApplicationProcessStage(this.application?.Id);
    this.onGetApplicationProcessStagebyVacancyProcessIdANDApplicationId(
      this.firstZartProcess?.Id,
      this.application?.Id
    );
  }
  // ngAfterContentChecked() {
  // }
  // ngAfterViewChecked(){
  //   this.onGetApplicationProcessStage(this.application?.Id);
  // }

  onGetUpdatedBy() {
    this.updatedBy = this._identitySvc.updatedBy();
    // console.log('updatedBy>>>: ', this.updatedBy);
    return this.updatedBy;
  }

  onGetApplicationProcessStagebyVacancyProcessIdANDApplicationId(
    VacancyProcessId: string,
    ApplicationId: string
  ) {
    let subscription = this._jobApplicationStageSvc
      .GetApplicationProcessStagebyVacancyProcessIdANDApplicationId(
        VacancyProcessId,
        ApplicationId
      )
      .subscribe({
        next: (response: any) => {
          // 
          if (response.ResponseCode == '00' && response.Data.length) {
            console.log('response data: ', response?.Data);
            this.isDone = true;
            console.log('this.isDone : ', this.isDone);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  // onGetApplicationProcessStage(ApplicationId: string) {
  //   // console.log('ApplicationId^^^^^^^^^^^^^^^^^^^^^^^^: ', ApplicationId);
  //   let subscription = this._jobApplicationStageSvc
  //     .getApplicationProcessStageByApplicationId(ApplicationId)
  //     .subscribe({
  //       next: (response: any) => {
  //         // console.log('response$$$$$$$$$$$$$$$$$$$$$$$$$$$: ', response);
  //         if (response.ResponseCode == '00') {
  //           // console.log(
  //           //   'response.Data.length++++++++++++++++++ : ',
  //           //   response.Data.length
  //           // );
  //           this.isProcessStarted = true;
  //           // alert( this.isProcessStarted);
  //           this.processStartedEvent.emit(this.isProcessStarted);
  //         } else if (response.ResponseCode == '404') {
  //           this.isProcessStarted = false;
  //           // alert(this.isProcessStarted);
  //           this.processStartedEvent.emit(this.isProcessStarted);
  //         } else {
  //           return;
  //         }
  //       },
  //       error: (err: any) => {
  //         console.warn('Error: ', err);
  //         if (err.status == '404') {
  //         }
  //       },
  //     });
  //   this.subscriptions.push(subscription);
  // }

  // onScheduleInterview() {
  //   const Payload = {
  //     ApplicationId: this.application.Id,
  //     VacancyProcessId: this.firstZartProcess.Id,
  //   };
  //   const ProcessStage = {
  //     Status: this.firstZartProcess.Name,
  //     UpdatedBy: this.onGetUpdatedBy(),
  //     DateCompleted: new Date().toDateString(),
  //   };
    
  //   // console.log('x: ', ProcessStage);

  //   let subscription = this._jobApplicationStageSvc
  //     .getApplicationProcessStageByApplicationId(Payload.ApplicationId)
  //     .subscribe({
  //       next: (response: any) => {
  //         // 
  //         if (response) {
  //           if (response.ResponseCode == '404') {
  //             this.addApplicationProcessStage(Payload, ProcessStage);
  //           } else {
  //             alert('occupied!');
  //           }
  //         }
  //       },
  //       error: (err: any) => {
  //         console.warn('Error: ', err);
  //       },
  //     });
  //   this.subscriptions.push(subscription);
  // }

  addApplicationProcessStage(Payload: any, ProcessStage: any) {
    this._jobApplicationStageSvc
      .AddApplicationProcessStage(Payload, ProcessStage)
      .subscribe({
        next: (response: any) => {
          
          if (response) {
            
            this._jobApplicationStageSvc.sendJobApplicationStageSubject(
              'Interview scheduled!'
            );
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
  }

  onUpdateProcess(Process: any, ProcessId: string) {
    let subscription = this._jobApplicationStageSvc
      .UpdateApplicationProcessStage(Process, ProcessId)
      .subscribe({
        next: (response: any) => {
          // 
        },
        error: (err: any) => {
          console.log('err: ', err);
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
