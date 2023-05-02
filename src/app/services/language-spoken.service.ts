import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LanguageSpoken } from '../models/types/language-spoken';

@Injectable({
  providedIn: 'root',
})
export class LanguageSpokenService {
  LanguageSpokenUrl = environment.baseUrl + 'api/Language/';
  AddLanguageSpoken = this.LanguageSpokenUrl + 'AddLanguageSpoken/';
  GetLanguagesSpoken = this.LanguageSpokenUrl + 'GetLanguagesSpoken/';
  UpdateLanguagesSpoken = this.LanguageSpokenUrl + 'UpdateLanguagesSpoken/';
  RemoveLanguage = this.LanguageSpokenUrl + 'RemoveLanguage/';

  editBehaviouralMsg = new BehaviorSubject(false);
  addBehaviouralMsg = new BehaviorSubject(false);
  //
  languageSubjectItem = new Subject();

  constructor(private _http: HttpClient) {}

  sendEditBehaviouralMsg(msg: any) {
    return this.editBehaviouralMsg.next(msg);
  }
  getEditBehaviouralMsg() {
    return this.editBehaviouralMsg.asObservable();
  }

  sendAddBehaviouralMsg(msg: any) {
    return this.addBehaviouralMsg.next(msg);
  }
  getAddBehaviouralMsg() {
    return this.addBehaviouralMsg.asObservable();
  }

  sendLanguageSubjectItem(item: any) {
    return this.languageSubjectItem.next(item);
  }
  getLanguageSubjectItem() {
    return this.languageSubjectItem.asObservable();
  }

  addLanguageSpoken(userId: string, data: LanguageSpoken) {
    return this._http.post(`${this.AddLanguageSpoken}${userId}`, data);
  }

  getLanguagesSpoken(userId: any) {
    return this._http.get(`${this.GetLanguagesSpoken}${userId}`).pipe(
      map((response: any) => {
        if (response) {
          const Body = response?.Data;
          return Body;
        }
      })
    );
  }

  updateLanguageSpoken(languageId: string, data: LanguageSpoken) {
    return this._http.put(`${this.UpdateLanguagesSpoken}${languageId}`, data);
  }

  deleteLanguageSpoken(languageId: any) {
    return this._http.delete(`${this.RemoveLanguage}${languageId}`);
  }
}
