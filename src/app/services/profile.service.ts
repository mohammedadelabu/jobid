import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CandidateProfile, Profile } from '../models/types/candidate-profile';
import { UserProfile } from '../models/types/user-profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  GetAllProfilesUrl = environment.baseUrl + 'api/Profile/GetAllProfiles/';
  GetProfileUrl = environment.baseUrl + 'api/Profile/GetProfile/';
  AddProfile = environment.baseUrl + 'api/Profile/AddProfile/';
  UpdateProfile = environment.baseUrl + 'api/Profile/UpdateProfile/';

  constructor(private _http: HttpClient) {}

  getAllProfiles(): Observable<Profile> {
    return this._http
      .get<Profile>(this.GetAllProfilesUrl, {
        observe: 'response',
        // observe: 'events',
      })
      .pipe(
        map((response: any) => {
          //
          const Body = response.body;
          if (response.status === 200) {
            if (Body.ResponseCode == '00') {
              // console.log('Body: ', Body);
              return Body;
            }
          }
        })
      );
  }

  getCandidateProfile(candidateId: any) {
    return this._http
      .get<any>(`${this.GetProfileUrl}${candidateId}`, {
        observe: 'response',
        // observe: 'events',
      })
      .pipe(
        map((response: any) => {
          const Body = response.body;
          if (response?.status == 200) {
            if (Body?.ResponseCode == '00') {
              if (Body?.Data?.length > 0) return Body?.Data[0];
            }
          }
        })
      );
  }

  updateCandidateProfile(
    profileId: String,
    profileData: CandidateProfile
  ): Observable<any> {
    return this._http.put<any>(
      `${this.UpdateProfile}${profileId}`,
      profileData
    );
  }

  updateCandidateSelfie(
    profileId: String,
    profileData: UserProfile
  ): Observable<any> {
    return this._http.put<any>(
      `${this.UpdateProfile}${profileId}/SelfieUpload`,
      profileData
    );
  }

  addCandidateProfile(profileData: CandidateProfile, candidateId: string) {
    return this._http.post(`${this.AddProfile}${candidateId}`, profileData);
  }
}
