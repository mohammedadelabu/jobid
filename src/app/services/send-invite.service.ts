import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SendInviteService {
  CompanyUrl = environment.baseUrl;
  SendInviteUrl = environment.baseUrl + 'SendInvite/';

  constructor(private _http: HttpClient) {}

  sendCandidateInvite(Payload: any) {
    return this._http.post(
      `${this.SendInviteUrl}?Candidate=${Payload.Candidate}&CandidateName=${Payload.CandidateName}&CandidateEmail=${Payload.CandidateEmail}`,
      Payload
    );
  }

  sendCompanyInvite(Payload: any) {
    return this._http.post(
      `${this.SendInviteUrl}?Company=${Payload.Company}&CompanyName=${Payload.CompanyName}&CompanyEmail=${Payload.CompanyEmail}`,
      Payload
    );
  }
  // https://zartjobid-engine.azurewebsites.net/cv/SendInvite?Company=true&CompanyName=BottomUp&CompanyEmail=ibrahimalli2016%40yahoo.com
  // https://zartjobid-engine.azurewebsites.net/cv/SendInvite?Candidate=true&CandidateName=Ibrahim&CandidateEmail=ibrahimalli2016%40yahoo.com
}
