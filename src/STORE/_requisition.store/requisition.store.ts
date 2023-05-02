export interface JID_RequisitionState {
  requisitionsList: any;
  error: any;
  //   lastUpdate: Date;
  isLoading: boolean;
}

export const INITIAL_REQUISITION_STATE: JID_RequisitionState = {
  requisitionsList: null,
  error: null,
  //   lastUpdate: new Date(),
  isLoading: false,
};
