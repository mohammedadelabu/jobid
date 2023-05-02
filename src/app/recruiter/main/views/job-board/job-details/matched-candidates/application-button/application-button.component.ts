import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-application-button',
  templateUrl: './application-button.component.html',
  styleUrls: ['./application-button.component.scss'],
})
export class ApplicationButtonComponent implements OnInit, OnDestroy {
  @Input('CandidateId') CandidateId!: string;
  @Input('JobId') JobId!: string;
  isSend!: boolean;
  responseMessage!: string;
  subscriptions: Subscription[] = [];
  constructor(private _jobApplicationSvc: JobApplicationService) {}

  ngOnInit(): void {}

  // apply(CandidateId: string, JobId: string) {
  //   console.log('CandidateId: ', CandidateId, 'JobId: ', JobId);
  // }
  apply(CandidateId: string, JobId: string) {
    console.log('CandidateId: ', CandidateId, 'JobId: ', JobId);
    const Payload = {
      VacancyId: JobId,
      CandidateId: CandidateId,
    };
    let subscription = this._jobApplicationSvc
      .postApplication(Payload)
      .subscribe({
        next: (response: any) => {
          if (response) {
            console.log('Applied', response);
            this.isSend = true;
            // this.responseMessage = "Application sent!"
            this.responseMessage = response?.Msg;
            setTimeout(() => {
              this.responseMessage = '';
            }, 2500);
          }
        },
        error: (err: any) => {
          if (err) {
            console.warn('Error: ', err);
          }
        },
      });
    this.subscriptions.push(subscription);
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
