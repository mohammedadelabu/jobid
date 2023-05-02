import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecruitmentService {
  RecruitmentUrl = environment.baseUrl + 'api/';

  constructor(private _http: HttpClient) {}
}
