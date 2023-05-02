import { FETCH_GLOBAL_SEARCH_RESULT, FETCH_GLOBAL_SEARCH_RESULT_ERROR, FETCH_GLOBAL_SEARCH_RESULT_SUCCESS } from "./globalSearch.actions";
import { FetchGlobalSearchResult, FetchGlobalSearchResultFailure, FetchGlobalSearchResultSuccess } from "./globalSearch.functions";
import { INITIAL_GLOBAL_SEARCH_RESULT_STATE, JID_GlobalSearchResultState } from "./globalSearch.store";

export function GlobalSearchResultReducer(
  state: JID_GlobalSearchResultState | any = INITIAL_GLOBAL_SEARCH_RESULT_STATE,
  action: any
): JID_GlobalSearchResultState {
  switch (action.type) {
    // FETCH_GLOBAL_SEARCH_RESULT
    case FETCH_GLOBAL_SEARCH_RESULT:
      return FetchGlobalSearchResult(state, action);
    case FETCH_GLOBAL_SEARCH_RESULT_SUCCESS:
      return FetchGlobalSearchResultSuccess(state, action);
    case FETCH_GLOBAL_SEARCH_RESULT_ERROR:
      return FetchGlobalSearchResultFailure(state, action);

  }

  return state
  
}
