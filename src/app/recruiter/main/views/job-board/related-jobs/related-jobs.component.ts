import {
  AfterContentChecked,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';

@Component({
  selector: 'app-related-jobs',
  templateUrl: './related-jobs.component.html',
  styleUrls: ['./related-jobs.component.scss'],
})
export class RelatedJobsComponent
  implements OnInit, AfterContentChecked, OnDestroy
{
  @Input('JobDetails') JobDetails: any;
  searchItem: any;
  relatedJobList: any;
  subscriptions: Subscription[] = [];
  constructor(private _jobVacancySvc: JobVacancyService) {}

  ngOnInit(): void {
    this.getRelatedJobs();
  }

  ngAfterContentChecked() {
    this.searchItem = this.JobDetails;
  }

  getRelatedJobs() {
    console.log('JobDetails: ', this.JobDetails);
    console.log(
      'JobDetails***: ',
      JSON.parse(this.JobDetails?.Body).toString()
    );
    this.searchItem = this.JobDetails?.JobTitle;
    // let SkillsListFromBody = JSON.parse(this.JobDetails?.Body).toString();
    // this.searchItem = SkillsListFromBody;
    // console.log("this.searchItem: ", this.searchItem)
    // console.log("this.searchItem typeof: ", typeof this.searchItem)
    let subscription = this._jobVacancySvc
      .searchJobVacancies(this.searchItem)
      .subscribe({
        next: (response: any) => {
          if (response) {
            console.log('Related Jobs List: ', response);
            this.relatedJobList = response?.Data[0].filter(
              (job: any) => job.Id != this.JobDetails.Id
            );
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);

    // console.log('JobDetails title: ', x.split(/[ ,]+/).join(','));
  }  
  
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
