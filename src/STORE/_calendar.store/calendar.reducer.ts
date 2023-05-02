import { tassign } from 'tassign';
import {
  ADD_CALENDAR_EVENT,
  ADD_CALENDAR_EVENT_ERROR,
  ADD_CALENDAR_EVENT_SUCCESS,
  FETCH_CALENDAR_EVENT_LIST,
  FETCH_CALENDAR_EVENT_LIST_ERROR,
  FETCH_CALENDAR_EVENT_LIST_SUCCESS,
  REMOVE_CALENDAR_EVENT,
  REMOVE_CALENDAR_EVENT_ERROR,
  REMOVE_CALENDAR_EVENT_SUCCESS,
} from './calendar.actions';
import {
  INITIAL_CALENDAR_EVENT_STATE,
  JID_CalendarEventState,
} from './calendar.store';

export function CalendarEventReducer(
  state: JID_CalendarEventState | any = INITIAL_CALENDAR_EVENT_STATE,
  action: any
): JID_CalendarEventState {
  switch (action.type) {
    // FETCH CALENDAR EVENTs
    case FETCH_CALENDAR_EVENT_LIST:
      return tassign(state, {
        isLoading: true,
      });
    case FETCH_CALENDAR_EVENT_LIST_SUCCESS:
      return tassign(state, {
        calendarEventList: action.payload,
        isLoading: false,
      });

    case FETCH_CALENDAR_EVENT_LIST_ERROR:
      return tassign(state, {
        error: action.payload,
      });

    // ADD CALENDAR EVENT
    case ADD_CALENDAR_EVENT:
      return tassign(state, {
        isLoading: true,
      });
    case ADD_CALENDAR_EVENT_SUCCESS:
      var newEvent = {
        id: state.calendarEventList?.length + 1,
        ...action.payload,
      };
      return tassign(state, {
        calendarEventList: state.calendarEventList.concat(newEvent),
        isLoading: false,
        // lastUpdate: new Date(),
      });

    case ADD_CALENDAR_EVENT_ERROR:
      return tassign(state, {
        error: action.payload,
        isLoading: false,
      });

    // REMOVECALENDAR EVENT
    case REMOVE_CALENDAR_EVENT:
      return tassign(state, {
        isLoading: true,
      });

    case REMOVE_CALENDAR_EVENT_SUCCESS:
      return tassign(state, {
        calendarEventList: state.calendarEventList.filter((t: any) => t.Id !== action.payload),
        isLoading: false,
      });
    case REMOVE_CALENDAR_EVENT_ERROR:
      return tassign(state, {
        error: action.payload,
        isLoading: false,
      });
  }
  return state;
}
