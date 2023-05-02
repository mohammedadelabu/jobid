import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  UPDATE_COMPANY_PROCESS,
  UPDATE_COMPANY_PROCESS_ERROR,
  UPDATE_COMPANY_PROCESS_SUCCESS,
} from 'src/STORE/_jobBoard.store/jobBoard.actions';

@Injectable({
  providedIn: 'root',
})
export class VacancyProcessService {
  InterviewProcessSubject = new Subject();
  internalVacancyId = environment.internalVacancyId;

  VacancyProcessUrl = environment.baseUrl + 'api/VacancyProcess/';
  UploadDocumentUrl = this.VacancyProcessUrl + 'UploadDocuments/';
  AddVacancyProcessUrl = this.VacancyProcessUrl + 'AddVacancyProcess/';
  GetVacancyProcessUrl =
    this.VacancyProcessUrl + 'GetVacancyProcessByVacancyId/';
  UpdateVacancyProcessUrl = this.VacancyProcessUrl + 'UpdateVacancyProcess/';
  RemoveVacancyProcessUrl = this.VacancyProcessUrl + 'RemoveVacancyProcess/';
  updateCompanyProcessUrl =
    environment.baseUrl + 'api/JobVacancies/UpdateJobVacancyInterviewStages/';

  constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) {}

  sendMsg(msg: any) {
    console.log(
      'interview prosee result>>>>>>sendInterviewProcessSubject: ',
      msg
    );
    return this.InterviewProcessSubject.next(msg);
  }

  getMsg() {
    return this.InterviewProcessSubject.asObservable();
  }

  addVacancyProcess(VacancyProcess: VacancyProcess, VacancyId: string) {
    return this._http.post(
      `${this.AddVacancyProcessUrl}${VacancyId}`,
      VacancyProcess
    );
  }

  getVacancyProcess(VacancyId: string) {
    return this._http.get(`${this.GetVacancyProcessUrl}${VacancyId}`);
  }

  updateVacancyProcess(VacancyProcess: VacancyProcess, ProcessId: string) {
    return this._http.put(
      `${this.UpdateVacancyProcessUrl}${ProcessId}`,
      VacancyProcess
    );
  }

  removeVacancyProcess(VacancyId: string) {
    return this._http.delete(`${this.RemoveVacancyProcessUrl}${VacancyId}`);
  }

  getInternalVacancyProcess() {
    return this._http.get(
      `${this.GetVacancyProcessUrl}${this.internalVacancyId}`
    );
  }

  updateCompanyProcess(
    jobvacancyId: string,
    vacancyProcess: {
      InterviewName: string;
      InterviewDate: string;
    }[]
  ) {
    this.ngRedux.dispatch({ type: UPDATE_COMPANY_PROCESS });
    return this._http
      .patch(`${this.updateCompanyProcessUrl}${jobvacancyId}`, vacancyProcess)
      .subscribe({
        next: (response: any) => {
          if (response) {
            const formatVacancyProcess = vacancyProcess.map((process) => ({
              Name: process.InterviewName,
              InterviewDate: process.InterviewDate,
            }));

            this.ngRedux.dispatch({
              type: UPDATE_COMPANY_PROCESS_SUCCESS,
              payload: formatVacancyProcess,
            });
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          this.ngRedux.dispatch({
            type: UPDATE_COMPANY_PROCESS_ERROR,
            payload: err,
          });
        },
      });
  }
}

export interface VacancyProcess {
  Name: string;
  // DateCompleted: string;
  Successful: boolean;
  UpdatedBy: string;
}
