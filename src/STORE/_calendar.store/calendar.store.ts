export interface JID_CalendarEventState {
  calendarEventList: any[];
  error: any;
//   lastUpdate: Date;
  isLoading: boolean;
}

export const INITIAL_CALENDAR_EVENT_STATE: JID_CalendarEventState = {
  calendarEventList: [],
  error: null,
//   lastUpdate: new Date(),
  isLoading: false,
};
