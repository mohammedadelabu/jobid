import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-simple-message-card',
  templateUrl: './activity-simple-message-card.component.html',
  styleUrls: ['./activity-simple-message-card.component.scss']
})
export class ActivitySimpleMessageCardComponent implements OnInit {
  @Input()itemContent:any;

  constructor() { }

  ngOnInit(): void {
  }

}
