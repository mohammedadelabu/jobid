import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experience } from '../models/types/experience';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  GetExperienceUrl = environment.baseUrl + 'api/Experience/GetExperience/';
  AddExperience = environment.baseUrl + 'api/Experience/AddExperience/';
  UpdateExperience = environment.baseUrl + 'api/Experience/UpdateExperience/';
  RemoveExperience = environment.baseUrl + 'api/Experience/RemoveExperience/';

  constructor(private _http: HttpClient) {}

  getCandidateWorkHistory(userId: string) {
    return this._http.get(`${this.GetExperienceUrl}${userId}`).pipe(
      map((response:any)=> {
        if(response){
          const Body = response?.Data
          return Body
        }
      })
    )
    
    // .pipe(
    //   map((response: any) => {
    //     const Body = response.body;

    //     let experiences: any[] = Body.data;
    //     let experienceList: any[] = [];
    //     if (response) {
    //       for (let key in experiences) {
    //         currently: true;
    //         description: "<ul>\r\n<li>Implementation of the SWIFT Release Upgrade/Migration from version 7.4 to 7.6.</li>\r\n<li>Installation and configuration of message partners on SWIFT Alliance Access for MT103, MT760, MT940 messages.</li>\r\n<li>Configuration of Alliance Access GUI packages for verifiers on Alliance Web platform.</li>\r\n<li>Configuration of Alliance Remote Gateway via SWIFT VPN connections</li>\r\n<li>Support on the Migration of Alliance Access from User Login to Radius-one time password using AD password and tokens with a 2FA authentication Server.</li>\r\n<li>Support on running of BOT services on USSD, ATM reconciliation, and UIP settlement on Robotics to Customers account Using MSSQL</li>\r\n<li>Resolution of Security officers&rsquo; profile on Alliance access and access to O2M services for sanction screening users.</li>\r\n<li>Rerouting of Staff payable invoices/expenses on Oracle-EBS for approval and support on maintenance of the oracle applications.</li>\r\n<li>Reactivation of Staff's workflows and assigning to their supervisor on the Oracle EBS portal.</li>\r\n<li>Support on Gori Cheque truncated system (CTS) on the postage customers' cheques and connectivity to NIBSS via NAPS or NEFT inward and outward.</li>\r\n<li>Mapping and activation of Swift user Tokens on SWIFT tracker for processing of MT199 statement to SWIFT.</li>\r\n</ul>";
    //         employerName: 'Union Bank PLC';
    //         endDate: '12/2022';
    //         id: 'da405d8c-0de3-434f-9d0f-08da3d9725d6';
    //         jobTitle: 'SWIFT, Cheque truncation system and Oracle-EBS Support analyst';
    //         lastUpdate: '0001-01-01T00:00:00';
    //         location: 'Nigeria';
    //         startDate: '10/2021';
    //         teamSize: '6';
    //         techStack: 'MySQL, MSSQL, Oracle ERP, SWIFT (All Modules)';
    //         updatedBy: null;
    //         user: null;
    //         userId: '88f61c1d-6e51-48a6-88e7-c98bcbc267c4';
    //       }
    //     }
    //   })
    // );
  }

  addWorkExperience(experience: Experience, userId: string) {
    return this._http.post(`${this.AddExperience}${userId}`, experience);
  }

  updateWorkExperience(data: Experience, id: string) {
    return this._http.put(`${this.UpdateExperience}${id}`, data);
  }

  removeWorkExperience(id: any) {
    return this._http.delete(`${this.RemoveExperience}${id}`);
  }
}
