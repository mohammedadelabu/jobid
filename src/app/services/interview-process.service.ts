import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InterviewProcess } from '../models/types/interview-process';

@Injectable({
  providedIn: 'root',
})
export class InterviewProcessService {
  VacancyProcessUrl = environment.baseUrl + 'api/VacancyProcess/';
  UploadDocumentUrl = this.VacancyProcessUrl + 'UploadDocuments/';
  // AddVacancyProcessUrl = this.VacancyProcessUrl + 'AddVacancyProcess​/';
  AddVacancyProcessUrl = this.VacancyProcessUrl + 'AddVacancyProcess/';
  GetVacancyProcessUrl = this.VacancyProcessUrl + 'GetVacancyProcessByVacancyId/';
  UpdateVacancyProcessUrl = this.VacancyProcessUrl + 'UpdateVacancyProcess/';
  RemoveVacancyProcessUrl =  this.VacancyProcessUrl + 'RemoveVacancyProcess/';
// '/api/VacancyProcess/UpdateVacancyProcess/{id}'
  InterviewProcesses!: InterviewProcess[];
  // InterviewProcessSubject = new Subject();
  InterviewProcessSubject = new Subject();

  constructor(private _http: HttpClient) {}

  isProcesses() {
    if (localStorage.getItem('Interview_Processes')) {
      return true;
    } else {
      return false;
    }
  }

  addProcess(InterviewProcess: InterviewProcess) {
    if (this.isProcesses()) {
      let x: any = localStorage.getItem('Interview_Processes');
      this.InterviewProcesses = JSON.parse(x);

      this.InterviewProcesses.push(InterviewProcess);
      localStorage.setItem(
        'Interview_Processes',
        JSON.stringify(this.InterviewProcesses)
      );
      this.getProcess();
    } else {
      this.InterviewProcesses = [];
      this.InterviewProcesses.push(InterviewProcess);
      localStorage.setItem(
        'Interview_Processes',
        JSON.stringify(this.InterviewProcesses)
      );
      this.getProcess();
    }
  }

  getProcess() {
    let InterviewProcesses: any = localStorage.getItem('Interview_Processes');
    let result;
    if (InterviewProcesses) {
      result = JSON.parse(InterviewProcesses);
    }
    // return JSON.parse(InterviewProcesses);
    console.log('interview prosee result: ', result);
    return this.sendInterviewProcessSubject(result);
  }

  deleteProcess(Id: string) {
    let InterviewProcesses: any = localStorage.getItem('Interview_Processes');
    let x = JSON.parse(InterviewProcesses).filter(
      (process: any) => process.Id != Id
    );
    
    localStorage.setItem('Interview_Processes', JSON.stringify(x));
    this.getProcess();
  }

  sendInterviewProcessSubject(msg: any) {
    console.log(
      'interview prosee result>>>>>>sendInterviewProcessSubject: ',
      msg
    );
    return this.InterviewProcessSubject.next(msg);
  }

  receiveInterviewProcessSubject() {
    return this.InterviewProcessSubject.asObservable();
  }

  addInterviewProcess(Payload: any, VacancyId: string) {
    return this._http.post(`${this.AddVacancyProcessUrl}${VacancyId}`, Payload);
  }

  getInterviewProcesses(VacancyId: string) {
    return this._http.get(`${this.GetVacancyProcessUrl}${VacancyId}`);
  }

  updateInterviewProcess(Process: any, ProcessId: string) {
    console.log(Process, ProcessId)
    return this._http.put(`${this.UpdateVacancyProcessUrl}${ProcessId}`, Process);
  }
  removeInterviewProcess(ProcessId: string) {
    console.log(ProcessId)
    return this._http.delete(`${this.RemoveVacancyProcessUrl}${ProcessId}`);
  }
}
