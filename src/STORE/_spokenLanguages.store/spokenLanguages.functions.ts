import { tassign } from 'tassign';
import { JID_SpokenLanguageState } from './spokenLanguages.store';

// FETCH dEALSlIST
export const FetchSpokenLanguages = (state: JID_SpokenLanguageState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchSpokenLanguagesSuccess = (
  state: JID_SpokenLanguageState,
  action: any
) => {
  return tassign(state, {
    spokenLanguageList: action?.payload,
    isLoading: false,
  });
};
export const FetchSpokenLanguagesFailure = (
  state: JID_SpokenLanguageState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};
