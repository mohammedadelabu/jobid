import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-task-details',
  templateUrl: './project-task-details.component.html',
  styleUrls: ['./project-task-details.component.scss']
})
export class ProjectTaskDetailsComponent implements OnInit {
  showFiller = false;
  constructor() { }

  ngOnInit(): void {
  }

}
