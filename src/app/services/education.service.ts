import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Education } from '../models/types/education';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  GetEducationUrl = environment.baseUrl + 'api/Education/GetAllEducation/';
  AddEducationUrl = environment.baseUrl + 'api/Education/AddEducation/';
  UpdateEducationUrl = environment.baseUrl + 'api/Education/UpdateEducation/';
  RemoveEducationUrl = environment.baseUrl + 'api/Education/RemoveEducation/';

  constructor(private _http: HttpClient) {}

  addEducation(education: Education, id: string): Observable<any> {
    return this._http.post<any>(`${this.AddEducationUrl}${id}`, education);
  }

  getCandidateEducation(userId: string) {
    return this._http.get<any>(`${this.GetEducationUrl}${userId}`).pipe(
      retry(4),
      map((response: any) =>  {
        if(response){
          const Body = response?.Data
          return Body
        }
      })
    );
  }

  removeEducation(id: string) {
    return this._http.delete(`${this.RemoveEducationUrl}${id}`);
  }

  updateEducation(data: Education, id: string) {
    return this._http.put(`${this.UpdateEducationUrl}${id}`, data);
  }
}
