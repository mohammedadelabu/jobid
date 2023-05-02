import { tassign } from 'tassign';
import { JID_GlobalSearchResultState } from './globalSearch.store';

// FETCH dEALSlIST
export const FetchGlobalSearchResult = (
  state: JID_GlobalSearchResultState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchGlobalSearchResultSuccess = (
  state: JID_GlobalSearchResultState,
  action: any
) => {
  return tassign(state, {
    globalSearchResult: action?.payload,
    isLoading: false,
  });
};
export const FetchGlobalSearchResultFailure = (
  state: JID_GlobalSearchResultState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};
