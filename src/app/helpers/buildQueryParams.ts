import { QueryParamsModel } from '../models/types/queryParamsModel';

//build your query
export function buildQueryParams(userQuery: any) {
  //store query parameters in a temporary variable
  const query = [];
  //loop through user query object
  for (var key in userQuery) {
    //encode the keys and values this is most necessary for search inputs
    query.push(
      encodeURIComponent(key) +
        '=' +
        encodeURIComponent(userQuery[key as keyof QueryParamsModel])
    );
  }
  //construct new URL
  let new_params = query.length ? '?' + query.join('&') : '';
  return new_params;
}
