import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationStageService {
  JobApplicationProcessUrl = environment.baseUrl + 'api/JobApplicationStage/';
  GetApplicationProcessStageByApplicationIdUrl =
    this.JobApplicationProcessUrl +
    'GetApplicationProcessStageByApplicationId/';
  GetApplicationProcessStageByvacancyIdUrl =
    this.JobApplicationProcessUrl + 'GetApplicationProcessStageByvacancyId/';
  AddApplicationProcessStagebyIdUrl =
    this.JobApplicationProcessUrl + 'AddApplicationProcessStagebyId';
  UpdateApplicationProcessStagebyIdUrl =
    this.JobApplicationProcessUrl + 'UpdateApplicationProcessStagebyId';
  UpdateInternalApplicantStageUrl =
    this.JobApplicationProcessUrl + 'InternalApplicantStage/';
  UpdateExternalApplicantStageUrl =
    this.JobApplicationProcessUrl + 'ExternalApplicantStage/';
  GetApplicationProcessStagebyVacancyProcessIdANDApplicationIdUrl =
    this.JobApplicationProcessUrl +
    'GetApplicationProcessStagebyVacancyProcessIdANDApplicationId';
  AddScoreCardUrl = environment.baseUrl + 'api/ScoreCard/' + 'CreateScoreCard/';
  GetUserScoreCardUrl =
    environment.baseUrl + 'api/ScoreCard/' + 'GetUserScoreCard/';

  JobApplicationStageSubject = new Subject();

  constructor(private _http: HttpClient) {}

  sendJobApplicationStageSubject(data: any) {
    this.JobApplicationStageSubject.next(data);
  }

  getApplicationProcessStageByApplicationId(
    ApplicationId: any,
    InterviewStageType: string
  ) {
    return this._http.get(
      `${this.GetApplicationProcessStageByApplicationIdUrl}?applicationId=${ApplicationId}&InterviewStageType=${InterviewStageType}`
    );
  }

  getApplicationProcessStageByvacancyId(VacancyId: string) {
    return this._http.get(
      `${this.GetApplicationProcessStageByvacancyIdUrl}${VacancyId}`
    );
  }

  AddApplicationProcessStage(Payload: any, ProcessStage: any) {
    return this._http.post(
      `${this.AddApplicationProcessStagebyIdUrl}?applicationId=${Payload.ApplicationId}&vacancyProcessId=${Payload.VacancyProcessId}`,
      ProcessStage
    );

    // https://zartjobid-engine.azurewebsites.net/cv/api/JobApplicationStage/AddApplicationProcessStagebyId?applicationId=ss&vacancyProcessId=ssss
  }

  UpdateApplicationProcessStage(ProcessStage: any, ProcessId: string) {
    return this._http.post(
      `${this.UpdateApplicationProcessStagebyIdUrl}${ProcessId}`,
      ProcessStage
    );
  }

  UpdateInternalApplicantStage(ProcessId: string, ProcessStage: any) {
    return this._http.patch(
      `${this.UpdateInternalApplicantStageUrl}${ProcessId}`,
      ProcessStage
    );
  }

  UpdateExternalApplicantStage(ProcessId: string, ProcessStage: any) {
    return this._http.patch(
      `${this.UpdateExternalApplicantStageUrl}${ProcessId}`,
      ProcessStage
    );
  }

  GetApplicationProcessStagebyVacancyProcessIdANDApplicationId(
    VacancyProcessId: string,
    ApplicationId: string
  ) {
    return this._http.get(
      `${this.GetApplicationProcessStagebyVacancyProcessIdANDApplicationIdUrl}?vacancyProcessId=${VacancyProcessId}&applicationId=${ApplicationId}`
    );
  }

  AddScoreCard(applicatantId: string, data: any) {
    return this._http.post(`${this.AddScoreCardUrl}${applicatantId}`, data);
  }

  GetUserScoreCard(
    userid: string,
    VacancyId: string,
    JobApplicationId: string,
    scoreCardType: string
  ) {
    return this._http.get(
      `${this.GetUserScoreCardUrl}${userid}?VacancyId=${VacancyId}&JobApplicationId=${JobApplicationId}&scoreCardType=${scoreCardType}`
    );
  }
}
