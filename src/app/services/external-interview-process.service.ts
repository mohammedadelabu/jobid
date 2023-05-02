import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExternalInterviewProcessService {
  VacancyProcessUrl = environment.baseUrl + 'api/VacancyProcess/';

  constructor(private _http: HttpClient) { }




}
