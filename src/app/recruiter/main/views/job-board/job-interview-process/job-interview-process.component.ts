import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-interview-process',
  templateUrl: './job-interview-process.component.html',
  styleUrls: ['./job-interview-process.component.scss'],
})
export class JobInterviewProcessComponent implements OnInit {
  @Input('CompanyId') CompanyId: any;
  constructor() {}

  ngOnInit(): void {
    console.log('jobId: ', this.CompanyId);
  }
}
