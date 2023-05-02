import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../models/types/project';
import { AddProject, UpdateProject } from '../models/project-management';

@Injectable({
  providedIn: 'root',
})
export class ProjectManagementService {
  ProjectUrl = environment.baseUrl + 'api/ProjectMgmt_Project/';
  GetProject = this.ProjectUrl + 'GetProjectMgmt_Project/' ;
  ProjectById = this.ProjectUrl + 'GetProjectMgmt_Project/';
  AddProject = this.ProjectUrl + 'AddProjectMgmt_Project/';
  UpdateProject = this.ProjectUrl + 'UpdateProjectMgmt_Project/';
  RemoveProject = this.ProjectUrl + 'RemoveProjectMgmt_Project/';

  constructor(private _http: HttpClient) {}

  createProjectMgmtProject(Project: AddProject, userId: string): Observable<any> {
    return this._http.post<any>(`${this.AddProject}${userId}`, Project);
  }

  getProjectMgmtProjects() {
    return this._http.get<any>(`${this.GetProject}`).pipe(retry(4));
  }

  getProjectMgmtProjectById(projectId:any) {
    return this._http.get<any>(`${this.GetProject}${projectId}`).pipe(retry(4));
  }

  removeProjectMgmtProject(id: any) {
    return this._http.delete(`${this.RemoveProject}${id}`);
  }

  updateProjectMgmtProject(data: UpdateProject, id: string) {
    return this._http.put(`${this.UpdateProject}${id}`, data);
  }
}
