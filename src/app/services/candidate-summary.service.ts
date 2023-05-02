import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CandidateSummaryService {
  CandidateSummaryUrl = environment.baseUrl + 'api/CandidateSummary/';
  GetCandidateSummary = this.CandidateSummaryUrl + 'GetCandidateSummary/';
  AddCandidateSummary = this.CandidateSummaryUrl + 'AddCandidateSummary/';
  UpdateCandidateSummary = this.CandidateSummaryUrl + 'UpdateCandidateSummary/';
  RemoveCandidateSummary = this.CandidateSummaryUrl + 'RemoveCandidateSummary/';

  editBehaviouralMsg = new BehaviorSubject(false);
  addBehaviouralMsg = new BehaviorSubject(false);
  candidateSummarySubjectItem = new Subject();

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

  sendCandidateSummarySubjectItem(item: any) {
    return this.candidateSummarySubjectItem.next(item);
  }
  getCandidateSummarySubjectItem() {
    return this.candidateSummarySubjectItem.asObservable();
  }

  retrieveCandidateInformation() {}

  getCandidateSummary(userId: string) {
    return this._http
      .get(`${this.CandidateSummaryUrl}GetCandidateSummary/${userId}`)
      .pipe(
        map((response: any) => {
          const Body = response?.Data;
          if (Body) {
            return Body;
          }
        })
      );
  }

  addCandidateSummary(data: any, id: string) {
    return this._http.post(
      `${this.CandidateSummaryUrl}AddCandidateSummary/${id}`,
      data
    );
  }

  updateCandidateSummary(data: any, id: string) {
    return this._http.put(
      `${this.CandidateSummaryUrl}UpdateCandidateSummary/${id}`,
      data
    );
  }
  deletCandidateSummary(id: string) {
    return this._http.delete(
      `${this.CandidateSummaryUrl}RemoveCandidateSummary/${id}`
    );
  }
}
