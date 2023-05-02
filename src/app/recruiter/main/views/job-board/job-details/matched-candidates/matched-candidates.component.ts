import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-matched-candidates',
  templateUrl: './matched-candidates.component.html',
  styleUrls: ['./matched-candidates.component.scss'],
})
export class MatchedCandidatesComponent implements OnInit, OnDestroy {
  @Input('JobSkills') JobSkills: any;
  @Input('JobDetails') JobDetails!: any;
  matchedCandidatesList: any;
  totalRecords!: string;
  page = 1;
  count = 0;
  subscriptions: Subscription[] = [];
  jobDetailSkills!: string;
  constructor(private _skillSvc: SkillService) {}

  ngOnInit(): void {
    // console.log('JobSkills: ', this.JobSkills.toString());
    let skillsets = this.JobSkills.toString();
    this.onGetMatchedCandidates(skillsets);
    this.jobDetailSkills = JSON.stringify(this.JobSkills);
  }

  onGetMatchedCandidates(Skillsets: string) {
    // this._skillSvc.searchCandidatesBySkills(Skillsets).subscribe({
    //   next: (response: any) => {
    //     console.log('Matched candidates: ', response);
    //     // if (response) {
    //     //   this.matchedCandidatesList = response?.Data;
    //     //   console.log('Matched candidates=>this.matchedCandidatesList: ',  this.matchedCandidatesList);
    //     // }
    //     if (response) {
    //       let allRelatedCandidates = Array.prototype.concat.apply(
    //         [],
    //         response?.Data
    //       );
    //       console.log('allRelatedCandidates: ', allRelatedCandidates);
    //       this.matchedCandidatesList = allRelatedCandidates
    //     } else {
    //       this.matchedCandidatesList = [];
    //     }
    //   },
    //   error: (err: any) => {
    //     console.warn('Error: ', err);
    //   },
    // });

    let subscription = this._skillSvc
      .searchCandidatesBySkills(Skillsets)
      .subscribe({
        next: (response: any) => {
          if (response.Data) {
            let allRelatedCandidates = Array.prototype.concat.apply(
              [],
              response?.Data
            );
            this.matchedCandidatesList = allRelatedCandidates.filter(
              (candidate: any) => candidate?.User != null
            );
            // console.log(
            //   'this.matchedCandidatesList: ',
            //   this.matchedCandidatesList
            // );
          } else {
            this.matchedCandidatesList = [];
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
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
