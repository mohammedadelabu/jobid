import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationService {
  JobApplicationSubject = new Subject();
  ActiveJobStatusTabSubject = new BehaviorSubject<number>(0);
  JobVacancyUrl = environment.baseUrl + 'api/';
  AddJobApplicationUrl =
    this.JobVacancyUrl + 'JobApplication/AddJobApplication';
  AddMultipleJobApplicationsUrl =
    this.JobVacancyUrl + 'JobApplication/AddMultipleJobApplication';
  GetAllJobApplicationsForVacancyUrl =
    this.JobVacancyUrl + 'JobApplication/GetAllJobApplicationsForVacancy/';
  GetJobApplicationsForVacancyByCandidateIdUrl =
    this.JobVacancyUrl +
    'JobApplication/GetJobApplicationsForVacancyByCadidateId/';
  GetAllUsersJobApplicationsUrl =
    this.JobVacancyUrl + 'JobApplication/GetAllUsersJobApplications/';
  RemoveJobApplicationsUrl =
    this.JobVacancyUrl + 'JobApplication/RemoveJobApplications/';
  UpdateApplicationStatusUrl =
    this.JobVacancyUrl + 'JobApplication/UpdateJobApplicationsStatus';
  UpdateMultipleApplicationStatusUrl =
    this.JobVacancyUrl + 'JobApplication/UpdateMultipleJobApplicationsStatus';
  AddJobApplicationQuestionAnswerUrl =
    this.JobVacancyUrl + 'JobApplication/AddJobApplicationQuestionAnswer/';

  constructor(private _http: HttpClient) {}

  sendJobApplicationSubject(Msg: any) {
    return this.JobApplicationSubject.next(Msg);
  }

  receiveJobApplicationSubject() {
    return this.JobApplicationSubject.asObservable();
  }

  postApplication(Payload: any) {
    return this._http.post(`${this.AddJobApplicationUrl}`, Payload);
  }

  postMultipleApplications(Payload: any[]) {
    return this._http.post(`${this.AddMultipleJobApplicationsUrl}`, Payload);
  }

  GetAllJobApplicationsForVacancy(VacancyId: string, queryParams: string) {
    return this._http.get(
      `${this.GetAllJobApplicationsForVacancyUrl}${queryParams}&vacancyID=${VacancyId}`
    );
  }

  GetJobApplicationsForVacancyByCandidateId(
    VacancyId: string,
    CandidateId: string
  ) {
    return this._http.get(
      `${this.GetJobApplicationsForVacancyByCandidateIdUrl}?vacancyID=${VacancyId}&CadidateId=${CandidateId}`
    );
  }

  GetAllJobApplications(UserId: string) {
    return this._http.get(`${this.GetAllUsersJobApplicationsUrl}${UserId}`);
  }

  UpdateApplicationStatus(Payload: any) {
    return this._http.put(
      `${this.UpdateApplicationStatusUrl}?status=${Payload.status}&applicationID=${Payload.applicationID}&updatedBy=${Payload.updatedBy}`,
      Payload
    );
    // https://zartjobid-engine.azurewebsites.net/cv/api/JobApplication/UpdateJobApplicationsStatus?status=dfzbbzdf&applicationID=dfbbfdz&updatedBy=dffdfd
  }

  // UpdateMultipleApplicationStatus(Payload: any) {
  //   return this._http.put(
  //     `${this.UpdateMultipleApplicationStatusUrl}?status=${Payload.status}&applicationID=${Payload.applicationID}&updatedBy=${Payload.updatedBy}`,
  //     Payload
  //   );
  // }

  // /api/JobApplication/UpdateMultipleJobApplicationsStatus/{applicationId}

  RemoveJobApplication(ApplicationId: string) {
    return this._http.delete(
      `${this.RemoveJobApplicationsUrl}${ApplicationId}`
    );
  }

  AddJobApplicationQuestionAnswer(Body: any) {
    return this._http.post(this.AddJobApplicationQuestionAnswerUrl, Body);
  }
}
