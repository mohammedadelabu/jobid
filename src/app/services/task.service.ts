import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_TASKS_LIST,
  FETCH_TASKS_LIST_ERROR,
  FETCH_TASKS_LIST_SUCCESS,
} from 'src/STORE/_task.store/tasks.actions';
import { Task } from '../models/types/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  GetAllTasksUrl = environment.baseUrl + 'api/CRMTasks/GetTasks';
  GetTasksPagedUrl = environment.baseUrl + 'api/Tasks/GetTasksPaged';
  GetTasksUrl = environment.baseUrl + 'api/Tasks/GetTasks';
  AddTasksUrl = environment.baseUrl + 'api/Tasks/AddTasks/';
  UpdateTasksUrl = environment.baseUrl + 'api/CRMTasks/UpdateTasksStatus';
  RemoveTasksUrl = environment.baseUrl + 'api/Tasks/RemoveTasks/';
  //
  CRMTaskUrl = environment.baseUrl + 'api/CRMTasks/';
  AddCRMTaskUrl = this.CRMTaskUrl + 'AddTask';

  Subscriptions: Subscription[] = [];

  constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) {}

  // LoadTasksList() {
  //   return this._http.get(this.GetAllTasksUrl);
  // }
  LoadTaskList() {
    this.ngRedux.dispatch({
      type: FETCH_TASKS_LIST,
    });
    let subscription = this._http.get<any>(this.GetAllTasksUrl).subscribe({
      next: (response) => {
        if (response) {
          console.warn('response: ', response);
          this.ngRedux.dispatch({
            type: FETCH_TASKS_LIST_SUCCESS,
            payload: response.Data,
          });
        }
      },
      error: (err: any) => {
        if (err) {
          this.ngRedux.dispatch({
            type: FETCH_TASKS_LIST_ERROR,
            payload: err,
          });
        }
      },
    });
    this.Subscriptions.push(subscription);
  }

  UpdateTasksStatus(id: string, status: string, payload: any) {
    return this._http.patch(`${this.UpdateTasksUrl}/${id}/${status}`, payload);
  }

  LoadTasksPagedList(Payload: TasksPaged) {
    this.ngRedux.dispatch({
      type: FETCH_TASKS_LIST,
    });
    if (Payload.StartDate != null && Payload.EndDate != null) {
      let subscription = this._http.get(
        `${this.GetTasksPagedUrl}?startDate=${Payload?.StartDate}&endDate=${Payload?.EndDate}&pageSize=${Payload?.PageSize}&pageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadTasksPagedList(subscription);
    } else if (
      Payload.StartDate != null &&
      Payload.EndDate != null &&
      Payload.TagId != null
    ) {
      let subscription = this._http.get(
        `${this.GetTasksPagedUrl}?startDate=${Payload?.StartDate}&endDate=${Payload?.EndDate}&tagId=${Payload?.TagId}&pageSize=${Payload?.PageSize}&pageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadTasksPagedList(subscription);
    } else if (Payload.TagId != null) {
      let subscription = this._http.get(
        `${this.GetTasksPagedUrl}?tagId=${Payload?.TagId}&pageSize=${Payload?.PageSize}&pageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadTasksPagedList(subscription);
    } else {
      let subscription = this._http.get(
        `${this.GetTasksPagedUrl}?pageSize=${Payload?.PageSize}&pageNumber=${Payload.PageNumber}`
      );
      this.SubscribeLoadTasksPagedList(subscription);
    }
  }

  SubscribeLoadTasksPagedList(subscription: any) {
    subscription?.subscribe({
      next: (response: any) => {
        if (response) {
          console.group('response: ', response);
          this.ngRedux.dispatch({
            type: FETCH_TASKS_LIST_SUCCESS,
            payload: response.Data,
          });
        }
      },
      error: (err: any) => {
        if (err) {
          this.ngRedux.dispatch({
            type: FETCH_TASKS_LIST_ERROR,
            payload: err,
          });
        }
      },
    });
    this.Subscriptions.push(subscription);
  }

  AddTask(Payload: Task) {
    return this._http.post(`${this.AddTasksUrl}`, Payload);
  }

  UpdateTask(Payload: Task, Id: string) {
    return this._http.put(`${this.UpdateTasksUrl}${Id}`, Payload);
  }

  DeleteTask(Id: string) {
    return this._http.delete(`${this.RemoveTasksUrl}${Id}`);
  }

  //

  AddCRMTask(Payload: Task) {
    return this._http.post(`${this.AddCRMTaskUrl}`, Payload);
  }
}

export interface Tag {
  id: any;
  name: string;
  isChecked: boolean;
}

export interface TasksPaged {
  StartDate: string | null;
  EndDate: string | null;
  TagId: string | null;
  PageSize: number | null;
  Location: string | null;
  PageNumber: number | null;
}
export interface TasksUpdate {
  Id: string | null;
}
