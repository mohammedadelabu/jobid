import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-candidate-profession',
  templateUrl: './candidate-profession.component.html',
  styleUrls: ['./candidate-profession.component.scss'],
})
export class CandidateProfessionComponent implements OnInit, OnDestroy {
  @Input('relatedCandidateId') relatedCandidateId!: string;
  relatedCandidateProfession: any;
  subscriptions: Subscription[] = [];
  constructor(private _profileSvc: ProfileService) {}

  ngOnInit(): void {
    this.onGetCandidateProfileDetails();
  }

  onGetCandidateProfileDetails() {
    let subscription = this._profileSvc
      .getCandidateProfile(this.relatedCandidateId)
      .subscribe({
        next: (response: any) => {
          if (response && response?.Data) {
            this.relatedCandidateProfession = response?.Data[0]?.Profession;
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
