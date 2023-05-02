import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../models/types/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  ProjectUrl = environment.baseUrl + 'api/Project/';
  GetProject = this.ProjectUrl + 'GetProject/';
  AddProject = this.ProjectUrl + 'AddProject/';
  UpdateProject = this.ProjectUrl + 'UpdateProject/';
  RemoveProject = this.ProjectUrl + 'RemoveProject/';

  constructor(private _http: HttpClient) {}

  addProject(Project: Project, id: string): Observable<any> {
    return this._http.post<any>(`${this.AddProject}${id}`, Project);
  }

  getCandidateProjects(userId: string) {
    return this._http.get<any>(`${this.GetProject}${userId}`).pipe(
      retry(4),
      map((response: any) => {
        if(response?.ResponseCode == '00'){
          const Body = response;
          return Body?.Data;
        }
      })
    );
  }

  removeProject(id: any) {
    return this._http.delete(`${this.RemoveProject}${id}`);
  }

  updateProject(data: Project, id: string) {
    return this._http.put(`${this.UpdateProject}${id}`, data);
  }
}
