import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shortlisted-candidate',
  templateUrl: './shortlisted-candidate.component.html',
  styleUrls: ['./shortlisted-candidate.component.scss']
})
export class ShortlistedCandidateComponent implements OnInit {
  @Input() Candidate: any;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }


  routeLink(UserId: string) {
    this._router.navigate(['/recruiter/candidates/cv-preview/', UserId]);
  }
}
