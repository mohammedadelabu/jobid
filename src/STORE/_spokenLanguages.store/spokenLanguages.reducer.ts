import {
  FETCH_SPOKEN_LANGUAGE_LIST,
  FETCH_SPOKEN_LANGUAGE_LIST_ERROR,
  FETCH_SPOKEN_LANGUAGE_LIST_SUCCESS,
} from './spokenLanguages.actions';
import {
  FetchSpokenLanguages,
  FetchSpokenLanguagesFailure,
  FetchSpokenLanguagesSuccess,
} from './spokenLanguages.functions';
import {
  INITIAL_SPOKEN_LANGUAGE_STATE,
  JID_SpokenLanguageState,
} from './spokenLanguages.store';

export function SpokenLanguageReducer(
  state: JID_SpokenLanguageState | any = INITIAL_SPOKEN_LANGUAGE_STATE,
  action: any
): JID_SpokenLanguageState {
  switch (action.type) {
    // FETCH_SPOKEN_LANGUAGE_LIST
    case FETCH_SPOKEN_LANGUAGE_LIST:
      return FetchSpokenLanguages(state, action);
    case FETCH_SPOKEN_LANGUAGE_LIST_SUCCESS:
      return FetchSpokenLanguagesSuccess(state, action);
    case FETCH_SPOKEN_LANGUAGE_LIST_ERROR:
      return FetchSpokenLanguagesFailure(state, action);
  }

  return state;
}
