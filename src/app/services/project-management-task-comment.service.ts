import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProjectManagementTaskCommentService {
  ProjectUrl = environment.baseUrl + 'api/ProjectMgmt_Comment/';
  GetProjectComment = this.ProjectUrl + 'GetProjectMgmt_Comment/';
  // GetProjectCommentById = this.ProjectUrl + 'GetProjectMgmt_Comment/';
  // ProjectCommentByTask = this.ProjectUrl + 'GetProjectMgmt_Comment/';
  AddProjectComment = this.ProjectUrl + 'AddProjectMgmt_Comment/';
  UpdateProjectComment = this.ProjectUrl + 'UpdateProjectMgmt_Comment/';
  RemoveProjectComment = this.ProjectUrl + 'RemoveProjectMgmt_Comment/';

  constructor(private _http: HttpClient) {}

  createProjectMgmtComment(userId: any, data: any) {
    return this._http.post<any>(`${this.AddProjectComment}${userId}`, data);
  }

  getAllProjectMgmtComments() {
    return this._http.get<any>(`${this.GetProjectComment}`).pipe(retry(4));
  }

  getProjectMgmtComment(id: any) {
    return this._http.get<any>(`${this.GetProjectComment}${id}`).pipe(retry(4));
  }

  getProjectMgmtCommentByTask(id: any) {
    return this._http
      .get<any>(`${this.GetProjectComment}${id}/task`)
      .pipe(retry(4));
  }

  removeProjectMgmtProjectComment(id: any) {
    return this._http.delete(`${this.RemoveProjectComment}${id}`);
  }

  updateProjectMgmtProjectComment(data: any, id: string) {
    return this._http.put(`${this.UpdateProjectComment}${id}`, data);
  }
}
