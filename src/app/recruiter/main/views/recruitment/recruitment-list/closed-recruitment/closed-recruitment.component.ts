import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-closed-recruitment',
  templateUrl: './closed-recruitment.component.html',
  styleUrls: ['./closed-recruitment.component.scss']
})
export class ClosedRecruitmentComponent implements OnInit {
  @Input('closedJobs') closedJobs: any;
  constructor() {}

  ngOnInit(): void {
    console.log('closedJobs: ', this.closedJobs);
  }

}
