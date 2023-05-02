import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyProcessService {
  // CompanyProcessUrl = environment.baseUrl + 'CompanyProcess/';
  CompanyProcessUrl = environment.baseUrl;
  UploadDocumentUrl = this.CompanyProcessUrl + 'UploadDocuments/';
  AddCompanyProcessUrl = this.CompanyProcessUrl + 'AddCompanyProcesses/';
  GetCompanyProcessUrl = this.CompanyProcessUrl + 'GetCompanyProcesses/';
  UpdateCompanyProcessUrl = this.CompanyProcessUrl + 'UpdateCompanyProcesses/';
  RemoveCompanyProcessUrl = this.CompanyProcessUrl + 'RemoveCompanyProcesses/';

  constructor(private _http: HttpClient) {}

  addCompanyProcess(CompanyProcess: any, CompanyId: string) {
    return this._http.post(
      `${this.AddCompanyProcessUrl}${CompanyId}?Name=${CompanyProcess.Name}&UpdatedBy=${CompanyProcess.UpdatedBy}`,
      CompanyProcess
    );
  }

  getCompanyProcess(CompanyId: string) {
    return this._http.get(`${this.GetCompanyProcessUrl}${CompanyId}`);
  }
  updateCompanyProcess(CompanyProcess: any, ProcessId: string) {
    return this._http.put(
      `${this.UpdateCompanyProcessUrl}${ProcessId}?Name=${CompanyProcess.Name}&UpdatedBy=${CompanyProcess.UpdatedBy}`,
      CompanyProcess
    );
  }

  removeCompanyProcess(ProcessId: string) {
    return this._http.delete(`${this.RemoveCompanyProcessUrl}${ProcessId}`);
  }
}

export interface CompanyProcess {
  Name: string;
  // DateCompleted: string;
  // Successful: string;
  UpdatedBy: string;
  companyId: string;
}
