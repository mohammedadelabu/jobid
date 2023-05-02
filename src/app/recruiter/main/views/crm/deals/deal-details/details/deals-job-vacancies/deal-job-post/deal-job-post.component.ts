import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deal-job-post',
  templateUrl: './deal-job-post.component.html',
  styleUrls: ['./deal-job-post.component.scss']
})
export class DealJobPostComponent implements OnInit {
  @Input()JobVacancy:any;
  constructor() { }

  ngOnInit(): void {
  }

}
