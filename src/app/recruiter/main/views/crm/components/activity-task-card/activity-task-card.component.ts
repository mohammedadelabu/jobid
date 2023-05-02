import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-task-card',
  templateUrl: './activity-task-card.component.html',
  styleUrls: ['./activity-task-card.component.scss'],
})
export class ActivityTaskCardComponent implements OnInit {
  @Input()itemContent:any;
  list = [1, 2, 3, 4, 5];
  constructor() {}

  ngOnInit(): void {}
}
