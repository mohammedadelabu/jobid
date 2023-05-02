import {
  AddApplicationModule,
  AddApplicationModuleFailure,
  AddApplicationModuleSuccess,
  FetchApplicationModule,
  FetchApplicationModuleFailure,
  FetchApplicationModuleSuccess,
  RemoveApplicationModule,
  RemoveApplicationModuleFailure,
  RemoveApplicationModuleSuccess,
  UpdateApplicationModule,
  UpdateApplicationModuleFailure,
  UpdateApplicationModuleSuccess,
} from './applicationModule.function';
import {
  ADD_APPLICATION_MODULE,
  ADD_APPLICATION_MODULE_ERROR,
  ADD_APPLICATION_MODULE_SUCCESS,
  FETCH_APPLICATION_MODULE_LIST,
  FETCH_APPLICATION_MODULE_LIST_ERROR,
  FETCH_APPLICATION_MODULE_LIST_SUCCESS,
  REMOVE_APPLICATION_MODULE,
  REMOVE_APPLICATION_MODULE_ERROR,
  REMOVE_APPLICATION_MODULE_SUCCESS,
  UPDATE_APPLICATION_MODULE,
  UPDATE_APPLICATION_MODULE_ERROR,
  UPDATE_APPLICATION_MODULE_SUCCESS,
} from './applicationModule.action';
import {
  INITIAL_APPLICATION_MODULE_STATE,
  JID_ApplicationModuleState,
} from './applicationModule.store';

export function ApplicationModuleReducer(
  state: JID_ApplicationModuleState | any = INITIAL_APPLICATION_MODULE_STATE,
  action: any
): JID_ApplicationModuleState {
  switch (action.type) {
    // FETCH_APPLICATION_MODULE_LIST
    case FETCH_APPLICATION_MODULE_LIST:
      return FetchApplicationModule(state, action);
    case FETCH_APPLICATION_MODULE_LIST_SUCCESS:
      return FetchApplicationModuleSuccess(state, action);
    case FETCH_APPLICATION_MODULE_LIST_ERROR:
      return FetchApplicationModuleFailure(state, action);

    // ADD_APPLICATION_MODULE
    case ADD_APPLICATION_MODULE:
      return AddApplicationModule(state, action);
    case ADD_APPLICATION_MODULE_SUCCESS:
      return AddApplicationModuleSuccess(state, action);
    case ADD_APPLICATION_MODULE_ERROR:
      return AddApplicationModuleFailure(state, action);

    // UPDATE_APPLICATION_MODULE
    case UPDATE_APPLICATION_MODULE:
      return UpdateApplicationModule(state, action);
    case UPDATE_APPLICATION_MODULE_SUCCESS:
      return UpdateApplicationModuleSuccess(state, action);
    case UPDATE_APPLICATION_MODULE_ERROR:
      return UpdateApplicationModuleFailure(state, action);

    // REMOVE_APPLICATION_MODULE
    case REMOVE_APPLICATION_MODULE:
      return RemoveApplicationModule(state, action);
    case REMOVE_APPLICATION_MODULE_SUCCESS:
      return RemoveApplicationModuleSuccess(state, action);
    case REMOVE_APPLICATION_MODULE_ERROR:
      return RemoveApplicationModuleFailure(state, action);
  }
  return state;
}
