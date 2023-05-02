import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { IAppState } from 'src/STORE/store';
import { CreateTaskComponent } from './create-task/create-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @select((s) => s.tasks.taskList) taskList$: any;
  @select((s) => s.tasks.isLoading) isLoading$: any;
  range!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _taskSvc: TaskService,
    public dialog: MatDialog,
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
  taskListArray: any[] = [];
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
  isActive: string = 'active';
  isNotActive: string = 'inactive';

  getTaskList() {
    this._taskSvc.LoadTaskList();
    this.taskList$.subscribe({
      next: (response: any) => {
        if (response) {
          this.taskListArray = response?.map((item: any) => ({
            id: item.Id,
            title: item.TaskName,
            des: item.Description,
            date: item.DueDate,
            status: item.Status,
          }));
          console.log(this.taskListArray);
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
        }
      },
    });
  }

  taskUpdate(id: string) {
    console.log(id);
  }

  updateStatus(id: string, status: string) {
    let newStat;
    if (status == 'active') {
      newStat = 'inactive';
    } else {
      newStat = 'active';
    }
    let Payload = {
      id: id,
      status: newStat,
    };

    this._taskSvc.UpdateTasksStatus(id, status, Payload).subscribe({
      next: (response: any) => {
        this.getTaskList();
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
        }
      },
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.getTaskList();
    console.log(this.isLoading$);
  }

  onChange($event: any) {}

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '100%',
      maxWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  consoleQuerry(): void {
    console.log(this.query);
  }

  buildForm() {
    this.range = this._fb.group({
      Start: '',
      End: '',
    });
  }

  back() {
    history.back();
  }

  focusPicker(picker: any) {
    picker.open();
  }
}
