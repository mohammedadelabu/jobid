import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';

@Component({
  selector: 'app-placement-details',
  templateUrl: './placement-details.component.html',
  styleUrls: ['./placement-details.component.scss'],
})
export class PlacementDetailsComponent implements OnInit, OnDestroy {
  @select((s) => s.jobBoard.jobDetail) jobDetails$: any;

  vacancy: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _jobVacancySvc: JobVacancyService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRouteParams();

    let subscription = this.jobDetails$.subscribe({
      next: (response: any) => {
        // console.log('New Job Details', response);
        // this.JobDetails = response.Data;
        this.vacancy = response;
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });

    this.subscriptions.push(subscription);
  }

  getRouteParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        if (params) {
          console.log('JobVacancyList: ', params);
          let vacancy = params.get('id');
          console.log('vacancy: ', vacancy);
          // this.getJobVacancyDetailss(vacancy);
          this.onGetJobVacancyById(vacancy);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  // getJobVacancyDetailss(ParamId: string) {
  //   let subscription = this._jobVacancySvc.getJobVacancies().subscribe({
  //     next: (response: any) => {
  //       if (response) {
  //         console.log('JobVacancyList: ', response);
  //         let jobVacancy = response.Data.filter(
  //           (vacancy: any) => vacancy.Id === ParamId
  //         );
  //         this.vacancy = jobVacancy[0];
  //         console.log('this.vacancy: ', this.vacancy);
  //       }
  //     },
  //     error: (err: any) => {
  //       console.warn('Error: ', err);
  //     },
  //   });
  //   this.subscriptions.push(subscription);
  // }

  onGetJobVacancyById(jobVacancyId: string) {
    this._jobVacancySvc.getJobVacancyById(jobVacancyId);
  }

  back() {
    history.back();
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
