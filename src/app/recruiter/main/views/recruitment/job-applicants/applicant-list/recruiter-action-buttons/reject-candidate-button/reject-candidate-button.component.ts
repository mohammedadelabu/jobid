import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IdentityService } from 'src/app/services/identity.service';
import { JobApplicationStageService } from 'src/app/services/job-application-stage.service';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';

@Component({
  selector: 'app-reject-candidate-button',
  templateUrl: './reject-candidate-button.component.html',
  styleUrls: ['./reject-candidate-button.component.scss'],
})
export class RejectCandidateButtonComponent implements OnInit, OnDestroy {
  @Input('application') application: any;
  updatedBy: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _jobApplicationSvc: JobApplicationService,
    private _identitySvc: IdentityService,
    private _messengerSvc: MessengerService,
    private _jobApplicationStageSvc: JobApplicationStageService
  ) {}

  ngOnInit(): void {
    this.onGetUpdatedBy();
  }

  onGetUpdatedBy() {
    this.updatedBy = this._identitySvc.updatedBy();
    console.log('updatedBy>>>: ', this.updatedBy);
    return this.updatedBy;
  }

  onUpdateApplicationStatus() {
    // alert("ibjkj")
    console.log('this.application: ', this.application);
    // this._jobApplicationSvc
    //   .UpdateApplicationStatus(this.application)
    //   .subscribe({
    //     next: (response: any) => {
    //       console.group('response: ', response);
    //     },
    //     error: (err: any) => {
    //       console.group('Error: ', err);
    //     },
    //   });
  }

  onRejectApplication() {
    // console.log('Shortlist: ', application);
    console.log('this.application: ', this.application);
    const Payload = {
      status: 'Rejected',
      applicationID: this.application.Id,
      updatedBy: this.onGetUpdatedBy(),
    };
    console.log('Update Shortlist: ', Payload);
    let subscription = this._jobApplicationSvc
      .UpdateApplicationStatus(Payload)
      .subscribe({
        next: (response: any) => {
          
          if (response) {
            // this._messengerSvc.sendSubject('Application rejected!');
            this._jobApplicationStageSvc.sendJobApplicationStageSubject(
              'application rejected!'
            );
          }
        },
        error: (err: any) => {
          
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
