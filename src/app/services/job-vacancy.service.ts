import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_JOB_VACANCY,
  FETCH_JOB_VACANCY_ERROR,
  FETCH_JOB_VACANCY_SUCCESS,
} from 'src/STORE/_jobBoard.store/jobBoard.actions';
import { AddJobVacancy } from '../models/types/job';

@Injectable({
  providedIn: 'root',
})
export class JobVacancyService {
  JobVacancyUrl = environment.baseUrl + 'api/';
  GetJobVacanciesUrl = this.JobVacancyUrl + 'JobVacancies/GetJobVacancies';
  GetPagedJobVacanciesUrl =
    this.JobVacancyUrl + 'JobVacancies/GetPagedJobVacancies';
  GetJobVacancyByIdUrl = this.JobVacancyUrl + 'JobVacancies/GetJobVacancyById';
  AddJobVacancyUrl = this.JobVacancyUrl + 'JobVacancies/AddJobVacancies/';
  GetJobVacanciesByCompanyUrl =
    this.JobVacancyUrl + 'JobVacancies/GetJobVacanciesByCompany/';
  SearchJobVacanciesUrl =
    this.JobVacancyUrl + 'JobVacancies/SearchJobVacancies/';
  UpdateJobVacancyPublishStatusUrl =
    this.JobVacancyUrl + 'JobVacancies/UpdateJobVacancyPublishStatus/';
  UpdateJobVacancyClosedStatusUrl =
    this.JobVacancyUrl + 'JobVacancies/UpdateJobVacancyClosedStatus/';
  UpdateJobVacancyStatusUrl =
    this.JobVacancyUrl + 'JobVacancies/JobVacancyStatus/';
  listCandidateCards = new BehaviorSubject(false);
  showDisclosedJob = new BehaviorSubject(true);
  AddNewJobVacancyForDealUrl =
    this.JobVacancyUrl + 'JobVacancies/NewJobVacancies/';

  JobTypes = [
    {
      Name: 'Permanent',
      Value: 'Permanent',
    },
    {
      Name: 'Contract',
      Value: 'Contract',
    },
    {
      Name: 'Part-time',
      Value: 'Part-time',
    },
    {
      Name: 'Full time',
      Value: 'Full time',
    },
    {
      Name: 'Remote work',
      Value: 'Remote work',
    },
    {
      Name: 'Temporary',
      Value: 'Temporary',
    },
  ];

  JobVacancyBehaviourSubject = new BehaviorSubject(null);

  constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) {}

  sendJobVacancyBehaviourSubjectMessage(Msg: any) {
    this.JobVacancyBehaviourSubject.next(Msg);
  }

  toggleCards() {
    this.listCandidateCards.next(!this.listCandidateCards.value);
  }

  toggleShowDisclosedJob() {
    this.showDisclosedJob.next(!this.showDisclosedJob.value);
  }

  getJobTypes() {
    return this.JobTypes;
  }

  getJobVacancies() {
    return this._http.get(this.GetJobVacanciesUrl);
  }

  getPagedJobVacancies(queryParams: string) {
    return this._http.get(`${this.GetPagedJobVacanciesUrl}${queryParams}`);
  }

  getJobVacancyById(jobVacancyId: string) {
    this.ngRedux.dispatch({ type: FETCH_JOB_VACANCY });
    return this._http
      .get(`${this.GetJobVacancyByIdUrl}?jobVacancyId=${jobVacancyId}`)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.ngRedux.dispatch({
              type: FETCH_JOB_VACANCY_SUCCESS,
              payload: response?.Data,
            });
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          this.ngRedux.dispatch({
            type: FETCH_JOB_VACANCY_ERROR,
            payload: err,
          });
        },
      });
  }

  getJobVacanciesByCompany(CompanyId: string) {
    return this._http.get(
      `${this.GetJobVacanciesByCompanyUrl}?id=${CompanyId}`
    );
  }

  postJob(Job: AddJobVacancy, UserId: string) {
    return this._http.post(`${this.AddJobVacancyUrl}${UserId}`, Job);
  }

  AddNewJobVacancyForDeal(Job: AddJobVacancy, UserId: string, DealId: string) {
    return this._http.post(`${this.AddNewJobVacancyForDealUrl}${DealId}`, Job);
  }

  searchJobVacancies(Payload: string) {
    return this._http.get(`${this.SearchJobVacanciesUrl}${Payload}`);
  }

  updateJobVacancyStatus(jobId: string, newStatus: string) {
    return this._http.patch(
      `${this.UpdateJobVacancyStatusUrl}${jobId}?jobVacancyStatus=${newStatus}`,
      {}
    );
  }

  onPublish(JobId: any, payload: any) {
    return this._http.patch<any>(
      `${this.UpdateJobVacancyPublishStatusUrl}${JobId}`,
      payload
    );
  }

  handlePublishJob(Status: any) {
    return this._http.patch(
      `${this.UpdateJobVacancyPublishStatusUrl}${Status.id}?status=${Status.status}`,
      Status
    );
  }
  handleClosedJob(Status: any) {
    return this._http.patch<any>(
      `${this.UpdateJobVacancyClosedStatusUrl}${Status.id}?isClosed=${Status.isClosed}`,
      Status
    );
  }
}
