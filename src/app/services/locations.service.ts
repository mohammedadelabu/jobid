import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private getLocationsUrl = environment.baseUrl + 'api/Location/GetLocations';

  constructor(private http: HttpClient) {}

  getLocations() {
    return this.http.get<any>(this.getLocationsUrl);
  }
}
