import {
  AfterContentChecked,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { JobApplicationService } from 'src/app/services/job-application.service';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';

@Component({
  selector: 'app-placed-applicants-list',
  templateUrl: './placed-applicants-list.component.html',
  styleUrls: ['./placed-applicants-list.component.scss'],
})
export class PlacedApplicantsListComponent
  implements OnInit, AfterContentChecked, OnDestroy
{
  @Input('vacancyId') vacancyId: any;
  JobApplicationList: any;
  uiList: any;
  noFound!: string;
  subscriptions: Subscription[] = [];
  constructor(
    private _jobapplicationSvc: JobApplicationService,
    private _jobVacancySvc: JobVacancyService
  ) {}

  ngOnInit(): void {
    console.log('vacancyId: ', this.vacancyId);
    // this.getAllApplicationList();
  }

  ngAfterContentChecked(): void {}

  // getAllApplicationList() {
  //   let subscription = this._jobapplicationSvc
  //     .GetAllJobApplicationsForVacancy(this.vacancyId)
  //     .subscribe({
  //       next: (response: any) => {
  //         if (response) {
  //           console.log('JobApplicationList: ', response);
  //           this.JobApplicationList = response?.Data?.filter(
  //             (applicant: any) => applicant.Status == 'Hired'
  //           );
  //           if (!this.JobApplicationList?.length) {
  //             // this.uiList = []
  //             this.noFound = 'No Placement';
  //             // this._jobVacancySvc.sendJobVacancyBehaviourSubjectMessage(false);
  //           } else {
  //             this.uiList = this.JobApplicationList?.slice(0, 4);
  //             console.log('this.uiList: ', this.uiList);
  //             console.log('this.JobApplicationList: ', this.JobApplicationList);
  //             // this._jobVacancySvc.sendJobVacancyBehaviourSubjectMessage(true);
  //             // this.uiList = response?.Data?.slice(0,4);
  //             // console.log("this.uiList: ", this.uiList)
  //           }
  //         }
  //         if (response.ResponseCode == '404') {
  //           this.noFound = 'No Placement';
  //           // this._jobVacancySvc.sendJobVacancyBehaviourSubjectMessage(false);
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
