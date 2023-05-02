import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill-search-results',
  templateUrl: './skill-search-results.component.html',
  styleUrls: ['./skill-search-results.component.scss'],
})
export class SkillSearchResultsComponent implements OnInit, OnDestroy {
  CandidateList: any;
  candidateBySkillsList: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _skillSvc: SkillService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (params: any) => {
        if (params.searchTerm) {
          console.log(params);
          this.searchCandidateBySkills(params.searchTerm);
        }
      },
    });
  }

  searchCandidateBySkills(searchTerm: string) {
    /* SEARCH BY SKILLS */
    let subscription = this._skillSvc
      .searchCandidatesBySkills(searchTerm)
      .subscribe({
        next: (response: any) => {
          if (response) {
            console.log('response skills: ', response);
            this.candidateBySkillsList = response?.Data[0]?.filter(
              (candidate: any) => candidate.User != null
            );
            console.log(
              'this.candidateList skills: ',
              this.candidateBySkillsList
            );
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
