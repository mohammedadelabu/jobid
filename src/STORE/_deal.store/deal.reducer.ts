import { tassign } from 'tassign';
import {
  ADD_DEAL,
  ADD_DEAL_ERROR,
  ADD_DEAL_SECONDARY_CONTACT,
  ADD_DEAL_SECONDARY_CONTACT_ERROR,
  ADD_DEAL_SECONDARY_CONTACT_SUCCESS,
  ADD_DEAL_SUCCESS,
  CONVERT_LEAD_TO_DEAL,
  CONVERT_LEAD_TO_DEAL_ERROR,
  CONVERT_LEAD_TO_DEAL_SUCCESS,
  FETCH_DEALS_LIST,
  FETCH_DEALS_LIST_ERROR,
  FETCH_DEALS_LIST_SUCCESS,
  FETCH_DEAL_COMPANY_DETAILS,
  FETCH_DEAL_COMPANY_DETAILS_ERROR,
  FETCH_DEAL_COMPANY_DETAILS_SUCCESS,
  FETCH_DEAL_DETAILS,
  FETCH_DEAL_DETAILS_ERROR,
  FETCH_DEAL_DETAILS_SUCCESS,
  FETCH_DEAL_PRIMARY_CONTACT_DETAILS,
  FETCH_DEAL_PRIMARY_CONTACT_DETAILS_ERROR,
  FETCH_DEAL_PRIMARY_CONTACT_DETAILS_SUCCESS,
  FETCH_DEAL_SECONDARY_CONTACT_LIST,
  FETCH_DEAL_SECONDARY_CONTACT_LIST_ERROR,
  FETCH_DEAL_SECONDARY_CONTACT_LIST_SUCCESS,
  REMOVE_DEAL,
  REMOVE_DEAL_ERROR,
  REMOVE_DEAL_SECONDARY_CONTACT,
  REMOVE_DEAL_SECONDARY_CONTACT_ERROR,
  REMOVE_DEAL_SECONDARY_CONTACT_SUCCESS,
  REMOVE_DEAL_SUCCESS,
  UPDATE_DEAL,
  UPDATE_DEAL_COMPANY_DETAILS,
  UPDATE_DEAL_COMPANY_DETAILS_ERROR,
  UPDATE_DEAL_COMPANY_DETAILS_SUCCESS,
  UPDATE_DEAL_ERROR,
  UPDATE_DEAL_SECONDARY_CONTACT,
  UPDATE_DEAL_SECONDARY_CONTACT_ERROR,
  UPDATE_DEAL_SECONDARY_CONTACT_SUCCESS,
  UPDATE_DEAL_STAGE,
  UPDATE_DEAL_STAGE_ERROR,
  UPDATE_DEAL_STAGE_SUCCESS,
  UPDATE_DEAL_SUCCESS,
} from './deal.actions';
import {
  AddDeal,
  AddDealFailure,
  AddDealSecondaryContact,
  AddDealSecondaryContactFailure,
  AddDealSecondaryContactSuccess,
  AddDealSuccess,
  ConvertLeadToDeal,
  ConvertLeadToDealFailure,
  ConvertLeadToDealSuccess,
  FetchDealCompanyDetails,
  FetchDealCompanyDetailsFailure,
  FetchDealCompanyDetailsSuccess,
  FetchDealDetails,
  FetchDealDetailsFailure,
  FetchDealDetailsSuccess,
  FetchDealList,
  FetchDealListFailure,
  FetchDealListSuccess,
  FetchDealPrimaryContactDetails,
  FetchDealPrimaryContactDetailsFailure,
  FetchDealPrimaryContactDetailsSuccess,
  FetchDealSecondaryContactList,
  FetchDealSecondaryContactListFailure,
  FetchDealSecondaryContactListSuccess,
  RemoveDeal,
  RemoveDealFailure,
  RemoveDealSecondaryContact,
  RemoveDealSecondaryContactFailure,
  RemoveDealSecondaryContactSuccess,
  RemoveDealSuccess,
  UpdateDeal,
  UpdateDealCompanyDetails,
  UpdateDealCompanyDetailsFailure,
  UpdateDealCompanyDetailsSuccess,
  UpdateDealFailure,
  UpdateDealSecondaryContact,
  UpdateDealSecondaryContactFailure,
  UpdateDealSecondaryContactSuccess,
  UpdateDealStage,
  UpdateDealStageFailure,
  UpdateDealStageSuccess,
  UpdateDealSuccess,
} from './deal.function';
import { INITIAL_DEAL_STATE, JID_DealState } from './deal.store';

export function DealReducer(
  state: JID_DealState | any = INITIAL_DEAL_STATE,
  action: any
): JID_DealState {
  switch (action.type) {
    // FETCH_DEAL_LIST
    case FETCH_DEALS_LIST:
      return FetchDealList(state, action);
    case FETCH_DEALS_LIST_SUCCESS:
      return FetchDealListSuccess(state, action);
    case FETCH_DEALS_LIST_ERROR:
      return FetchDealListFailure(state, action);

    // ADD_DEAL
    case ADD_DEAL:
      return AddDeal(state, action);
    case ADD_DEAL_SUCCESS:
      return AddDealSuccess(state, action);
    case ADD_DEAL_ERROR:
      return AddDealFailure(state, action);

    // UPDATE_DEAL
    case UPDATE_DEAL:
      return UpdateDeal(state, action);
    case UPDATE_DEAL_SUCCESS:
      return UpdateDealSuccess(state, action);
    case UPDATE_DEAL_ERROR:
      return UpdateDealFailure(state, action);

    // REMOVE_DEAL
    case REMOVE_DEAL:
      return RemoveDeal(state, action);
    // return tassign(state, {
    //   isLoading: true,
    // });

    case REMOVE_DEAL_SUCCESS:
      return RemoveDealSuccess(state, action);
    // return tassign(state, {
    //   dealsList: state.dealsList.filter((t: any) => t.Id !== action.payload),
    //   isLoading: false,
    // });
    case REMOVE_DEAL_ERROR:
      return RemoveDealFailure(state, action);
    // return tassign(state, {
    //   error: action.payload,
    //   isLoading: false,
    // });

    // CONVERT LEAD TO DEAL
    case CONVERT_LEAD_TO_DEAL:
      return ConvertLeadToDeal(state, action);
    case CONVERT_LEAD_TO_DEAL_SUCCESS:
      return ConvertLeadToDealSuccess(state, action);
    case CONVERT_LEAD_TO_DEAL_ERROR:
      return ConvertLeadToDealFailure(state, action);

    // FETCH DEAL DETAILS
    case FETCH_DEAL_DETAILS:
      return FetchDealDetails(state, action);
    case FETCH_DEAL_DETAILS_SUCCESS:
      return FetchDealDetailsSuccess(state, action);
    case FETCH_DEAL_DETAILS_ERROR:
      return FetchDealDetailsFailure(state, action);
      

    // UPDATE DEAL STAGE
    case UPDATE_DEAL_STAGE:
      return UpdateDealStage(state, action);
    case UPDATE_DEAL_STAGE_SUCCESS:
      return UpdateDealStageSuccess(state, action);
    case UPDATE_DEAL_STAGE_ERROR:
      return UpdateDealStageFailure(state, action);




    // FETCH DEAL COMPANY DETAILS
    case FETCH_DEAL_COMPANY_DETAILS:
      return FetchDealCompanyDetails(state, action);
    case FETCH_DEAL_COMPANY_DETAILS_SUCCESS:
      return FetchDealCompanyDetailsSuccess(state, action);
    case FETCH_DEAL_COMPANY_DETAILS_ERROR:
      return FetchDealCompanyDetailsFailure(state, action);

    // UPDATE DEAL COMPANY DETAILS
    case UPDATE_DEAL_COMPANY_DETAILS:
      return UpdateDealCompanyDetails(state, action);
    case UPDATE_DEAL_COMPANY_DETAILS_SUCCESS:
      return UpdateDealCompanyDetailsSuccess(state, action);
    case UPDATE_DEAL_COMPANY_DETAILS_ERROR:
      return UpdateDealCompanyDetailsFailure(state, action);

    // FETCH DEAL PRIMARY CONTACT DETAILS
    case FETCH_DEAL_PRIMARY_CONTACT_DETAILS:
      return FetchDealPrimaryContactDetails(state, action);
    case FETCH_DEAL_PRIMARY_CONTACT_DETAILS_SUCCESS:
      return FetchDealPrimaryContactDetailsSuccess(state, action);
    case FETCH_DEAL_PRIMARY_CONTACT_DETAILS_ERROR:
      return FetchDealPrimaryContactDetailsFailure(state, action);

    // FETCH DEAL SECONDARY CONTACT LIST
    case FETCH_DEAL_SECONDARY_CONTACT_LIST:
      return FetchDealSecondaryContactList(state, action);
    case FETCH_DEAL_SECONDARY_CONTACT_LIST_SUCCESS:
      return FetchDealSecondaryContactListSuccess(state, action);
    case FETCH_DEAL_SECONDARY_CONTACT_LIST_ERROR:
      return FetchDealSecondaryContactListFailure(state, action);

    // ADD DEAL SECONDARY CONTACT
    case ADD_DEAL_SECONDARY_CONTACT:
      return AddDealSecondaryContact(state, action);
    case ADD_DEAL_SECONDARY_CONTACT_SUCCESS:
      return AddDealSecondaryContactSuccess(state, action);
    case ADD_DEAL_SECONDARY_CONTACT_ERROR:
      return AddDealSecondaryContactFailure(state, action);

    // ADD DEAL SECONDARY CONTACT
    case UPDATE_DEAL_SECONDARY_CONTACT:
      return UpdateDealSecondaryContact(state, action);
    case UPDATE_DEAL_SECONDARY_CONTACT_SUCCESS:
      return UpdateDealSecondaryContactSuccess(state, action);
    case UPDATE_DEAL_SECONDARY_CONTACT_ERROR:
      return UpdateDealSecondaryContactFailure(state, action);

    // DELETE DEAL SECONDARY CONTACT
    case REMOVE_DEAL_SECONDARY_CONTACT:
      return RemoveDealSecondaryContact(state, action);
    case REMOVE_DEAL_SECONDARY_CONTACT_SUCCESS:
      return RemoveDealSecondaryContactSuccess(state, action);
    case REMOVE_DEAL_SECONDARY_CONTACT_ERROR:
      return RemoveDealSecondaryContactFailure(state, action);
  }
  return state;
}
// function uPDATEDealFailure(state: any, action: any): JID_DealState {
//   throw new Error('Function not implemented.');
// }
