import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-related-candidates',
  templateUrl: './related-candidates.component.html',
  styleUrls: ['./related-candidates.component.scss'],
})
export class RelatedCandidatesComponent implements OnInit, OnDestroy {
  RelatedCandidateList: any;
  val = 'Technical Skills';
  candidateId!: string | null;
  candidateProfileDetails: any;
  candidateSkillset: any;
  relatedCandidateList: any;
  totalRecords!: string;
  page = 1;
  count = 0;
  subscriptions: Subscription[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _profileSvc: ProfileService,
    private _skillSvc: SkillService
  ) {}

  ngOnInit(): void {
    this.getRouteParams();
  }

  getRouteParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        if (params) {
          this.candidateId = params.get('candidateId');
          this.onGetCandidateSkills(this.candidateId);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetCandidateSkills(candidateId: any) {
    let subscription = this._skillSvc
      .getCandidateSkillSet(candidateId)
      .subscribe({
        next: (response: any) => {
          console.log('candidate skillset: ', response);
          console.warn("('response'): ", response);
          if (response) {
            this.candidateSkillset = response;
            let newString = response[0]?.Skills.toLowerCase().replace(
              /[&\/\\+()$~%.'":*?<>{}]/g,
              ''
            );
            // let newString = response.Data[0].Skills.toLowerCase().replace(/D/g, '');
            console.log('newString: ', newString);
            this.onSearchRelatedCandidates(newString);
          }
        },
      });
    this.subscriptions.push(subscription);
  }

  onSearchRelatedCandidates(Skills: any) {
    let subscription = this._skillSvc
      .searchCandidatesBySkills(Skills)
      .subscribe({
        next: (response: any) => {
          console.warn("('response'): ", response);
          if (response.Data) {
            let allRelatedCandidates = Array.prototype.concat.apply(
              [],
              response?.Data
            );
            this.relatedCandidateList = allRelatedCandidates.filter(
              (candidate: any) =>
                candidate.User != null &&
                candidate?.User?.Id != this.candidateId
            );
          } else {
            this.relatedCandidateList = [];
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
