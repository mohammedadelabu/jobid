import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-candidate-portfolio-linkedin',
  templateUrl: './candidate-portfolio-linkedin.component.html',
  styleUrls: ['./candidate-portfolio-linkedin.component.scss'],
})
export class CandidatePortfolioLinkedinComponent implements OnInit {
  @Input('candidateId') candidateId!: string;
  candidateProfile: any;
  subscriptions: Subscription[] = [];

  constructor(private _profileSvc: ProfileService) {}

  ngOnInit(): void {
    this.onGetCandidateProfile(this.candidateId);
  }
  onGetCandidateProfile(candidateId: string) {
    let subscription = this._profileSvc
      .getCandidateProfile(candidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.candidateProfile = response;
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
