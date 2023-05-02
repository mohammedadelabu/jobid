import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ongoing-recruitment',
  templateUrl: './ongoing-recruitment.component.html',
  styleUrls: ['./ongoing-recruitment.component.scss'],
})
export class OngoingRecruitmentComponent implements OnInit {
  @Input('onGoingJobs') onGoingJobs: any;
  constructor() {}

  ngOnInit(): void {
    console.log('onGoingJobs: ', this.onGoingJobs);
  }
}
