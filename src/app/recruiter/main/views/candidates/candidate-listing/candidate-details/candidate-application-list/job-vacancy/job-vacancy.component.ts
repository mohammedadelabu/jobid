import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-job-vacancy',
  templateUrl: './job-vacancy.component.html',
  styleUrls: ['./job-vacancy.component.scss'],
})
export class JobVacancyComponent implements OnInit {
  @Input('Vacancy') Vacancy!: any;
  vacancyInfo: any;
  subscriptions: Subscription[] = [];
  constructor(private _jobApplicationSvc: JobApplicationService) {}

  ngOnInit(): void {
    // this.onGetJobVacancyDetails();
  }

  // onGetJobVacancyDetails() {
  //   let subscription = this._jobApplicationSvc
  //     .GetAllJobApplicationsForVacancy(this.Vacancy?.VacancyId)
  //     .subscribe({
  //       next: (response: any) => {
  //         console.log('response@@@@@: ', response);
  //         if (response) {
  //           let Info = response?.Data.filter(
  //             (item: any) => item?.Id == this.Vacancy?.Id
  //           );
  //           this.vacancyInfo = Info[0];
  //           console.log('this.vacancyInfo @@@@@: ', this.vacancyInfo);
  //         }
  //       },
  //       error: (err: any) => {
  //         console.warn('Error: ', err);
  //       },
  //     });
  //   this.subscriptions.push(subscription);
  // }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
