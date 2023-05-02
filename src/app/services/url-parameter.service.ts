import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlParameterService {
  constructor() {}

  setUrlParamMap(params: any) {
    localStorage.setItem('CURRENT_URL_PARAM', params);
  }

  getUrlParaMap() {
    let param = localStorage.getItem('CURRENT_URL_PARAM');
    return param;
  }
}
