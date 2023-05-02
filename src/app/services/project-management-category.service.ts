import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementCategoryService {

  ProjectUrl = environment.baseUrl + 'api/ProjectMgmt_Category/';
  GetProjectCategories = this.ProjectUrl + 'GetProjectMgmt_Category/';
  AddProjectCategory = this.ProjectUrl + 'AddProjectMgmt_Category/';
  UpdateProjectCategory = this.ProjectUrl + 'UpdateProjectMgmt_Category/';
  RemoveProjectCategory = this.ProjectUrl + 'RemoveProjectMgmt_Category/';

  constructor(private _http: HttpClient) {}

  createProjectMgmtCategory(data: any) {

    return this._http.post<any>(`${this.AddProjectCategory}`, data);
  }

  getProjectMgmtCategories(projectId:any) {
    return this._http
      .get<any>(`${this.GetProjectCategories}${projectId}/project`)
      .pipe(retry(4));
  }

  removeProjectMgmtProjectCategory(id: any) {
    return this._http.delete(`${this.RemoveProjectCategory}${id}`);
  }

  updateProjectMgmtProjectCategory(data: any, id: string) {
    return this._http.put(`${this.UpdateProjectCategory}${id}`, data);
  }
}
