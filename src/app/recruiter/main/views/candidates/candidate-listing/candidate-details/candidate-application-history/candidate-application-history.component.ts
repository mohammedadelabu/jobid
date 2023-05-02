import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-application-history',
  templateUrl: './candidate-application-history.component.html',
  styleUrls: ['./candidate-application-history.component.scss'],
})
export class CandidateApplicationHistoryComponent implements OnInit {
  @Input('candidateId') candidateId!: string;

  constructor() {}

  ngOnInit(): void {
  }
}
