import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecruiterOpinionService {
  RecruiterOpinionUrl = environment.baseUrl + 'api/RecruiterOpinion/';
  GetRecruiterOpinion = this.RecruiterOpinionUrl + 'GetRecruiterOpinion/';
  AddRecruiterOpinion = this.RecruiterOpinionUrl + 'AddRecruiterOpinion/';
  UpdateRecruiterOpinion = this.RecruiterOpinionUrl + 'UpdateRecruiterOpinion/';
  RemoveRecruiterOpinion = this.RecruiterOpinionUrl + 'RemoveRecruiterOpinion/';

  editBehaviouralMsg = new BehaviorSubject(false);
  addBehaviouralMsg = new BehaviorSubject(false);
  recruiterOpinionSubjectItem = new Subject();

  constructor(private _http: HttpClient) {}

  sendEditBehaviouralMsg(msg: any) {
    return this.editBehaviouralMsg.next(msg);
  }
  getEditBehaviouralMsg() {
    return this.editBehaviouralMsg.asObservable();
  }
  sendAddBehaviouralMsg(msg: any) {
    return this.addBehaviouralMsg.next(msg);
  }
  getAddBehaviouralMsg() {
    return this.addBehaviouralMsg.asObservable();
  }

  sendRecruiterOpinionSubjectItem(item: any) {
    return this.recruiterOpinionSubjectItem.next(item);
  }
  getRecruiterOpinionSubjectItem() {
    return this.recruiterOpinionSubjectItem.asObservable();
  }

  addRecruiterOpinion(data: any, userId: any): Observable<any> {
    return this._http.post<any>(`${this.AddRecruiterOpinion}${userId}`, data);
  }

  getRecruiterOpinion(userId: string) {
    return this._http.get<any>(`${this.GetRecruiterOpinion}${userId}`).pipe(
      map((response: any) => {
        const Body = response?.Data;
        if (Body) {
          return Body;
        }
      })
    );
    // return this._http.get(
    //   `http://zartjobid-engine.azurewebsites.net/cv/api/RecruiterOpinion/GetRecruiterOpinion/${userId}`
    // );
  }

  updateRecruiterOpinion(opinionId: string, data: any): Observable<any> {
    return this._http.put<any>(
      `${this.UpdateRecruiterOpinion}${opinionId}`,
      data
    );
    // return this._http.put<any>(
    //   `http://zartjobid-engine.azurewebsites.net/cv/api/RecruiterOpinion/UpdateRecruiterOpinion/${opinionId}`,
    //   data
    // );
  }

  deletRecruiterOpinion(id: any) {
    return this._http.delete(`${this.RemoveRecruiterOpinion}${id}`);
    // return this._http.delete(`http://zartjobid-engine.azurewebsites.net/cv/api/RecruiterOpinion/RemoveRecruiterOpinion/${id}`);
  }
}
