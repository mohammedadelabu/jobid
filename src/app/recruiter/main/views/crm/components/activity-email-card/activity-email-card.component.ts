import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-email-card',
  templateUrl: './activity-email-card.component.html',
  styleUrls: ['./activity-email-card.component.scss']
})
export class ActivityEmailCardComponent implements OnInit {
@Input()itemContent:any;
  constructor() { }

  ngOnInit(): void {
  }

}
