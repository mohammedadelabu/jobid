import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';

@Component({
  selector: 'app-placement-card',
  templateUrl: './placement-card.component.html',
  styleUrls: ['./placement-card.component.scss'],
})
export class PlacementCardComponent implements OnInit, OnDestroy {
  @Input('Job') Job: any;
  uiList: any;
  noFound!: string;
  subscriptions: Subscription[] = [];
  constructor(
    private _jobapplicationSvc: JobApplicationService,
    private _jobVacancySvc: JobVacancyService
  ) {}

  ngOnInit(): void {
    // this.getAllApplicationList();
  }
  ngAfterContentChecked(): void {}

  // getAllApplicationList() {
  //   let subscription = this._jobapplicationSvc
  //     .GetAllJobApplicationsForVacancy(this.Job?.Id)
  //     .subscribe({
  //       next: (response: any) => {
  //         if (response) {
  //           console.log('JobApplicationList: ', response);
  //           let JobApplicationList = response?.Data?.filter(
  //             (applicant: any) => applicant.Status == 'Hired'
  //           );
  //           if (!JobApplicationList?.length) {
  //             // this.uiList = []
  //             this.noFound = 'No Placement';
  //           } else {
  //             this.uiList = JobApplicationList?.slice(0, 4);
  //             console.log('this.uiList: ', this.uiList);
  //             console.log('JobApplicationList: ', JobApplicationList);
  //             // this.uiList = response?.Data?.slice(0,4);
  //             console.log('this.uiList: ', this.uiList);
  //           }
  //         }
  //         if (response.ResponseCode == '404') {
  //           this.noFound = 'No Placement';
  //         }
  //       },
  //       error: (err: any) => {
  //         console.warn('Error: ', err);
  //       },
  //     });
  //   this.subscriptions.push(subscription);
  // }

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
