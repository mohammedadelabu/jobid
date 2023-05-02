export interface JID_SpokenLanguageState {
  spokenLanguageList: any[];
  error: any;
  isLoading: boolean;
}

export const INITIAL_SPOKEN_LANGUAGE_STATE: JID_SpokenLanguageState = {
  spokenLanguageList: [],
  error: null,
  isLoading: false,
};
