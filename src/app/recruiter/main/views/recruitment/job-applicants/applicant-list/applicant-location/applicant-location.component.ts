import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-applicant-location',
  templateUrl: './applicant-location.component.html',
  styleUrls: ['./applicant-location.component.scss'],
})
export class ApplicantLocationComponent implements OnInit {
  @Input('candidateId') candidateId!: string;
  isLoading = false;
  candidateLocation: any;
  constructor(private _profileSvc: ProfileService) {}

  ngOnInit(): void {
    this.getCandidateProfile();
  }

  getCandidateProfile() {
    this.isLoading = true;
    this._profileSvc.getCandidateProfile(this.candidateId).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response) {
          this.candidateLocation = response?.Country;
        }
      },
      error: (err: any) => {
        this.isLoading = false;
      },
    });
  }
}
