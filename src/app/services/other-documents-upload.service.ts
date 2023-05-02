import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OtherDocumentsUploadService {
  GetOtherDocumentsUploadUrl = environment.baseUrl + 'GetOtherDocumentsUpload';
  AddOtherDocumentsUploadUrl = environment.baseUrl + 'AddOtherDocumentsUpload';
  UpdateOtherDocumentsUploadUrl =
    environment.baseUrl + 'UpdateOtherDocumentsUpload';
  RemoveOtherDocumentsUploadUrl =
    environment.baseUrl + 'RemoveOtherDocumentsUpload';

  constructor(private _http: HttpClient) {}

  getOtherDocumentsUpload(UserId: string): Observable<any> {
    return this._http.get<any>(`${this.GetOtherDocumentsUploadUrl}/${UserId}`);
  }

  getOtherDocumentsUploadForCompany(CompanyId: string): Observable<any> {
    return this._http.get<any>(
      `${this.GetOtherDocumentsUploadUrl}/${CompanyId}/company`
    );
  }

  addOtherDocumentsUpload(Payload: any): Observable<any> {
    return this._http.post<any>(
      // `${this.AddOtherDocumentsUploadUrl}?DocumentName=${Payload.DocumentName}&&DocumentType=${Payload.DocumentType}&UploadUrl=${Payload.UploadUrl}&userId=${Payload.UserId}&companyId=${Payload.CompanyId}`,
      `${this.AddOtherDocumentsUploadUrl}?DocumentName=${Payload.DocumentName}&DocumentType=${Payload.DocumentType}&UploadUrl=${Payload.UploadUrl}&isUser=${Payload.IsUser}&userId=${Payload.UserId}`,
      Payload
    );
  }

  addOtherDocumentsUploadForCompany(Payload: any): Observable<any> {
    return this._http.post<any>(
      // `${this.AddOtherDocumentsUploadUrl}?DocumentName=${Payload.DocumentName}&&DocumentType=${Payload.DocumentType}&UploadUrl=${Payload.UploadUrl}&userId=${Payload.UserId}&companyId=${Payload.CompanyId}`,
      `${this.AddOtherDocumentsUploadUrl}?DocumentName=${Payload.DocumentName}&DocumentType=${Payload.DocumentType}&UploadUrl=${Payload.UploadUrl}&companyId=${Payload.CompanyId}`,
      Payload
    );
  }

  removeDocument(DocId: string) {
    return this._http.delete(`${this.RemoveOtherDocumentsUploadUrl}/${DocId}`);
  }
}

// https://zartjobid-engine.azurewebsites.net/cv/AddOtherDocumentsUpload?DocumentName=dgab&DocumentType=bbdfbbfd&UploadUrl=bdfbfdfbdbdf&userId=fbdbffbd&companyId=fbdbdffdbfdb
