import { select } from '@angular-redux/store';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @select((s) => s.tasks.taskList) taskList$: any;
  @select((s) => s.tasks.isLoading) isTaskListLoading$: any;
  // @Input() taskList!: any[];
  items:any[] = [];
  constructor() {}

  ngOnInit(): void {
    // this.items = this.taskList;
  }
}
