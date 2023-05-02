import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { Project } from '../models/project';
// import { AddProject, UpdateProject } from '../models/project-management';

@Injectable({
  providedIn: 'root',
})
export class ProjectManagementTaskService {
  ProjectUrl = environment.baseUrl + 'api/ProjectMgmt_Tasks/';
  GetProjectTasks = this.ProjectUrl + 'GetProjectMgmt_TasksByProject/';
  GetProjectTasksByCat = this.ProjectUrl + 'GetProjectMgmt_TasksByCategory/';
  AddProjectTask = this.ProjectUrl + 'AddProjectMgmt_Tasks/';
  UpdateProjectTask = this.ProjectUrl + 'UpdateProjectMgmt_Tasks/';
  PatchProjectTaskCategory =
    this.ProjectUrl + 'UpdateProjectMgmt_TasksCategory/';
  PatchProjectTask = this.ProjectUrl + 'UpdateProjectMgmt_TasksStatus/';
  RemoveProjectTask = this.ProjectUrl + 'RemoveProjectMgmt_Tasks/';

  constructor(private _http: HttpClient) {}

  createProjectMgmtTask(data: any, projectId: string) {
    return this._http.post<any>(`${this.AddProjectTask}${projectId}`, data);
  }

  getProjectMgmtTasks(projectId: string) {
    return this._http
      .get<any>(`${this.GetProjectTasks}${projectId}`)
      .pipe(retry(4));
  }

  getProjectMgmtTasksByCategory(catId: string) {
    return this._http
      .get<any>(`${this.GetProjectTasksByCat}${catId}`)
      .pipe(retry(4));
  }

  patchProjectMgmtProjectTask(data: any, id: string) {
    return this._http.patch(
      `${this.PatchProjectTask}${id}` + '?status=' + data,
      data
    );
  }

  updateProjectMgmtProjectTaskCategory(idsData: any) {
    return this._http.patch(
      `${this.PatchProjectTaskCategory}${idsData.taskId}` +
        '/' +
        idsData.categoryId,
      {}
    );
  }

  removeProjectMgmtProjectTask(id: any) {
    return this._http.delete(`${this.RemoveProjectTask}${id}`);
  }

  updateProjectMgmtProjectTask(data: any, id: string) {
    return this._http.put(`${this.UpdateProjectTask}${id}`, data);
  }
}
