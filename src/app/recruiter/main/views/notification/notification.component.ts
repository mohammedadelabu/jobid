import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskService, TasksPaged } from 'src/app/services/task.service';
import { IAppState } from 'src/STORE/store';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @select((s) => s.tasks.tasksList) tasksList$: any;
  @select((s) => s.tasks.isLoading) isLoading$: any;
  @select((s) => s.tasksTags.tasksTags) tasksTags$: any;
  @select((s) => s.tasksTags.isLoading) tasksTagsIsLoading$: any;
  constructor(
    private _fb: FormBuilder,
    private _taskSvc: TaskService,
    private ngRedux: NgRedux<IAppState>
  ) {}
  filter!: FormGroup;
  daysOftheWeek: { id: number; name: string }[] = [
    { id: 0, name: 'Sunday' },
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Satuday' },
  ];
  tasksListArray: any[] = [];
  Subscriptions: Subscription[] = [];
  query = {
    start: '',
    end: '',
    weeks: '',
    location: '',
  };
  paginationData = {
    page: 1,
    count: 0,
    reverse: true,
    ItemsPerPage: 50,
    totalRecords: null,
  };

  onGetLeadsList() {
    const Payload: TasksPaged = {
      StartDate: null,
      EndDate: null,
      TagId: null,
      Location: null,
      PageSize: this.paginationData.ItemsPerPage,
      PageNumber: this.paginationData.page,
    };
    this._taskSvc.LoadTasksPagedList(Payload);
    let subscription = this.tasksList$.subscribe((response: any) => {
      if (response) {
        this.tasksListArray = response?.Items;
        this.paginationData.page = response?.PageNumber;
        this.paginationData.ItemsPerPage = response?.PageSize;
        this.paginationData.totalRecords = response?.TotalSize;
      }
    });
    this.Subscriptions.push(subscription);
    // console.log('leadsList: ', this.leadsList$);
  }

  taskList: { title: string; date: string; des: string }[] = [
    {
      title: 'Call Lead',
      date: '25 May',
      des: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem cum officia odio earum expedita nulla incidunt aliquid autem, iste molestias facere deleniti quaerat aliquam nostrum deserunt voluptatum harum temporibus omnis.',
    },
    {
      title: 'Call Lead',
      date: '25 May',
      des: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem cum officia odio earum expedita nulla incidunt aliquid autem, iste molestias facere deleniti quaerat aliquam nostrum deserunt voluptatum harum temporibus omnis.',
    },
    {
      title: 'Call Lead',
      date: '25 May',
      des: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem cum officia odio earum expedita nulla incidunt aliquid autem, iste molestias facere deleniti quaerat aliquam nostrum deserunt voluptatum harum temporibus omnis.',
    },
    {
      title: 'Call Lead',
      date: '25 May',
      des: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem cum officia odio earum expedita nulla incidunt aliquid autem, iste molestias facere deleniti quaerat aliquam nostrum deserunt voluptatum harum temporibus omnis.',
    },
    {
      title: 'Call Lead',
      date: '25 May',
      des: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem cum officia odio earum expedita nulla incidunt aliquid autem, iste molestias facere deleniti quaerat aliquam nostrum deserunt voluptatum harum temporibus omnis.',
    },
  ];

  ngOnInit(): void {}
  onChange($event: any) {}

  consoleQuerry(): void {
    console.log(this.query);
  }
}
