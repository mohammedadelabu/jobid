export interface JID_GlobalSearchResultState {
  globalSearchResult: any;
  candidateResultList: any;
  companyResultList: any;
  skillResultList: any;
  error: any;
  isLoading: boolean;
}

export const INITIAL_GLOBAL_SEARCH_RESULT_STATE: JID_GlobalSearchResultState = {
  globalSearchResult: null,
  candidateResultList: null,
  companyResultList: null,
  skillResultList: null,
  error: null,
  isLoading: false,
};
