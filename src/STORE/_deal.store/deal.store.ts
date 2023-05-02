export interface JID_DealState {
  dealsList: any[];
  converLeadToDeal: any;
  dealDetails: any;
  dealStage: any;
  dealCompanyDetails: any;
  dealPrimaryContactDetails: any;
  dealSecondaryContactList: any;
  dealVacancyList: any[];
  error: any;
  isLoading: boolean;
}

export const INITIAL_DEAL_STATE: JID_DealState = {
  dealsList: [],
  converLeadToDeal: null,
  dealDetails: null,
  dealStage: null,
  dealCompanyDetails: null,
  dealPrimaryContactDetails: null,
  dealSecondaryContactList: null,
  dealVacancyList: [],
  error: null,
  isLoading: false,
};
