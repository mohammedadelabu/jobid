import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deal-job-shortlisted-candidates',
  templateUrl: './deal-job-shortlisted-candidates.component.html',
  styleUrls: ['./deal-job-shortlisted-candidates.component.scss'],
})
export class DealJobShortlistedCandidatesComponent implements OnInit {
  @Input() JobVacancy: any;
  shortlistedApplicantList: any[] = [];
  constructor() {}

  ngOnInit(): void {
    this.shortlistedApplicantList = this.JobVacancy?.shortListedApplicants;
    console.log(
      'this.shortlistedApplicantList: ',
      this.shortlistedApplicantList
    );
  }
}
