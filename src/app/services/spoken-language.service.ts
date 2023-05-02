import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_SPOKEN_LANGUAGE_LIST,
  FETCH_SPOKEN_LANGUAGE_LIST_ERROR,
  FETCH_SPOKEN_LANGUAGE_LIST_SUCCESS,
} from 'src/STORE/_spokenLanguages.store/spokenLanguages.actions';

@Injectable({
  providedIn: 'root',
})
export class SpokenLanguageService {
  private languageUrl = environment.baseUrl + 'api/Language/GetAllLanguages';
  SpokenLanguagesUrl = environment.baseUrl + 'api/Language/';
  GetSpokenLanguagesUrl = this.SpokenLanguagesUrl + 'GetAllLanguages';

  spokenLanguages = ['English', 'Spanish', 'French'];
  worldwideSpokenLanguages = [
    'Afrikaans',
    'Arabic',
    'Bengali',
    'Bulgarian',
    'Catalan',
    'Cantonese',
    'Croatian',
    'Czech',
    'Danish',
    'Dutch',
    'Lithuanian',
    'Malay',
    'Malayalam',
    'Panjabi',
    'Tamil',
    'English',
    'Finnish',
    'French',
    'German',
    'Greek',
    'Hebrew',
    'Hindi',
    'Hungarian',
    'Indonesian',
    'Italian',
    'Japanese',
    'Javanese',
    'Korean',
    'Norwegian',
    'Polish',
    'Portuguese',
    'Romanian',
    'Russian',
    'Serbian',
    'Slovak',
    'Slovene',
    'Spanish',
    'Swedish',
    'Telugu',
    'Thai',
    'Turkish',
    'Ukrainian',
    'Vietnamese',
    'Welsh',
    'Sign language',
    'Algerian',
    'Aramaic',
    'Armenian',
    'Berber',
    'Burmese',
    'Bosnian',
    'Brazilian',
    'Bulgarian',
    'Cypriot',
    'Corsica',
    'Creole',
    'Scottish',
    'Egyptian',
    'Esperanto',
    'Estonian',
    'Finn',
    'Flemish',
    'Georgian',
    'Hawaiian',
    'Indonesian',
    'Inuit',
    'Irish',
    'Icelandic',
    'Latin',
    'Mandarin',
    'Nepalese',
    'Sanskrit',
    'Tagalog',
    'Tahitian',
    'Tibetan',
    'Gypsy',
    'Wu',
  ];
  constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) {}

  getSpokenLanguages() {
    // return this.spokenLanguages;
    return this._http.get<any>(this.languageUrl);
  }

  getWorldwideSpokenLanguages() {
    return this.worldwideSpokenLanguages;
  }

  LoadSpokenLanguages() {
    this.ngRedux.dispatch({ type: FETCH_SPOKEN_LANGUAGE_LIST });
    this._http.get<any>(this.GetSpokenLanguagesUrl).subscribe({
      next: (response: any) => {
        if (response) {
          
          this.ngRedux.dispatch({
            type: FETCH_SPOKEN_LANGUAGE_LIST_SUCCESS,
            payload: response.Data,
          });
        }
      },
      error: (err: any) => {
        if (err) {
          
          this.ngRedux.dispatch({
            type: FETCH_SPOKEN_LANGUAGE_LIST_ERROR,
            payload: err,
          });
        }
      },
    });
  }
}
