import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/STORE/store';
import {
  ADD_DEAL,
  ADD_DEAL_SUCCESS,
  FETCH_DEALS_LIST,
  FETCH_DEALS_LIST_ERROR,
  FETCH_DEALS_LIST_SUCCESS,
  FETCH_DEAL_COMPANY_DETAILS_SUCCESS,
  FETCH_DEAL_DETAILS,
  FETCH_DEAL_DETAILS_ERROR,
  FETCH_DEAL_DETAILS_SUCCESS,
  FETCH_DEAL_PRIMARY_CONTACT_DETAILS_SUCCESS,
  FETCH_DEAL_SECONDARY_CONTACT_LIST_SUCCESS,
  REMOVE_DEAL,
  REMOVE_DEAL_ERROR,
  REMOVE_DEAL_SUCCESS,
} from 'src/STORE/_deal.store/deal.actions';
import {
  ConvertCompanyLeadToDeal,
  ConvertNewCompanyLeadToDeal,
  DealContact,
  UpdateDealContact,
} from '../models/types/deal';

import dealCaseData from '../../assets/dealList.json';
// import { GroupedDealsCase } from 'src/assets/data/groupedDealsCase';
import { MapDeal } from '../models/classes/map-deal';
import { DealsList } from 'src/assets/data/groupedDealsCase';
import { ToastrService } from 'ngx-toastr';
// import { MapDeal } from '../models/classes/map-deal';
@Injectable({
  providedIn: 'root',
})
export class DealService implements OnDestroy {
  DealsListBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  DealDetailsBehaviorSubjectData: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  DealContactBehaviorSubjectData: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  // DealBehaviorSubject = new BehaviorSubject<any[]>([]);
  baseUrl = 'http://localhost:3000/DealsList';

  DealsUrl = environment.baseUrl + 'api/Deals/';
  GetAllDealsUrl = this.DealsUrl + 'get_all';
  GetGroupDealsUrl = this.DealsUrl + 'get_grouped';
  GetDealDetailsUrl = this.DealsUrl + 'get';
  GetDealDetailsNewUrl = this.DealsUrl + 'detail';
  GetDealDetailsNew2Url = this.DealsUrl + 'details';
  RemoveGroupDealsUrl = this.DealsUrl + 'delete';
  UpdateDealUrl = this.DealsUrl + 'update';
  // DEAL CONTACTS
  AddDealContactUrl = this.DealsUrl + 'add_contact';
  UpdateContactUrl = this.DealsUrl + 'update_contact';
  UpdateStageUrl = this.DealsUrl + 'update_stage';
  // ConvertLeadToDealUrl = this.DealsUrl + 'convert_lead_to_deal';
  ConvertNewCompanyLeadToDealUrl =
    this.DealsUrl + 'convert_new_company_lead_to_deal';
  ConvertCompanyLeadToDealUrl = this.DealsUrl + 'convert_company_lead_to_deal';
  SendEmailUrl = this.DealsUrl + 'SendEmail';
  GetDealActivitiesUrl = this.DealsUrl + 'DealActivities';
  TransferDealUrl = this.DealsUrl + 'TransferDeal';

  // /api/Deals/convert_new_company_lead_to_deal
  // /api/Deals/convert_company_lead_to_deal

  Subscriptions: Subscription[] = [];
  GroupedDealsCase_: any;
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private ngRedux: NgRedux<IAppState>,
    private toastr: ToastrService,
  ) {
    // console.log('data: ', dealCaseData);
  }

  sendDealsListBehaviorSubjectMessage(Data: any) {
    return this.DealsListBehaviorSubject.next(Data);
  }
  sendDealDetailsBehaviorMessage(Data: any) {
    return this.DealDetailsBehaviorSubjectData.next(Data);
  }

  SendDealContactBehaviourSubj(Data: DealContact) {
    return this.DealContactBehaviorSubjectData.next(Data);
  }

  GetGroupedDealsCase() {
    // this.GroupedDealsCase_ = new GroupedDealsCase().getCase();
    this.GroupedDealsCase_ = DealsList;
    console.log('this.GroupedDealsCase_: ', this.GroupedDealsCase_);
    this.sendDealsListBehaviorSubjectMessage(this.GroupedDealsCase_);
  }

  LoadGroupedDealsCase() {
    this.GetGroupedDealsCase();
    this.ngRedux.dispatch({ type: FETCH_DEALS_LIST });
    this.DealsListBehaviorSubject.subscribe({
      next: (data: any) => {
        if (data) {
          console.log('data: ', data);
          this.ngRedux.dispatch({
            type: FETCH_DEALS_LIST_SUCCESS,
            payload: data,
          });
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
          this.ngRedux.dispatch({
            type: FETCH_DEALS_LIST_ERROR,
            payload: err,
          });
        }
      },
    });

    //

    // this._http.get('../../assets/dealList.json').subscribe({
    //   next: (data: any) => {
    //     if (data) {
    //       this.LoadGroupDeals();
    //       console.log('data>>>>>>>>: ', data);
    //       this.sendDealsListBehaviorSubjectMessage(data);
    //       this.ngRedux.dispatch({
    //         type: FETCH_DEALS_LIST_SUCCESS,
    //         payload: data,
    //       });
    //     }
    //   },
    //   error: (err: any) => {
    //     if (err) {
    //       console.warn('Error: ', err);
    //       this.ngRedux.dispatch({
    //         type: FETCH_DEALS_LIST_ERROR,
    //         payload: err,
    //       });
    //     }
    //   },
    // });
  }

  LoadGroupDeals() {
    // let subscription = this._http.get(this.GetGroupDealsUrl).subscribe({
    //   next: (response: any) => {
    //
    //     if (response) {
    //       console.log('this.dealsList: ', response?.Data);
    //       let ApiData = response?.Data;
    //       this.mapData(ApiData);
    //     }
    //   },
    //   error: (err: any) => {
    //     console.warn('Error: ', err);
    //   },
    // });
    // this.Subscriptions.push(subscription);

    let subscription_ = this._http
      .get(this.GetGroupDealsUrl)
      .pipe(
        map((data: any) => {
          let apiListing = data?.Data;
          let DealsDataList: any[] = [];
          if (data) {
            for (let key in apiListing) {
              let deal = {
                Stage: apiListing[key].Stage,
                Deals: apiListing[key].Deals,
                DealsCount: apiListing[key].Deals?.length,
              };
              DealsDataList.push(deal);
            }
          }
          console.log('dealsList: ', DealsDataList);
          this.mapData(DealsDataList);
          // return {
          //   dealsList: DealsDataList,
          // };
        })
      )

      .subscribe({
        next: (response: any) => {
          if (response) {
            console.log('this.dealsList: ', response?.Data);
            let ApiData = response?.Data;
            this.mapData(ApiData);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.Subscriptions.push(subscription_);
  }

  mapData(ApiData: any) {
    console.log('ApiData!!!!: ', ApiData);
    let updatedData = new MapDeal(
      this.GroupedDealsCase_,
      ApiData
    ).mapApiDealListToLocal();
    console.log('updatedData: ', updatedData);
    this.sendDealsListBehaviorSubjectMessage(updatedData);
  }

  LoadDealsList() {
    this.ngRedux.dispatch({ type: FETCH_DEALS_LIST });
    let subscription = this._http.get(this.baseUrl).subscribe({
      next: (response: any) => {
        if (response) {
          // return this.sendDealBehaviorMessage(response);
          console.log('this.dealsList: ', response);
          this.ngRedux.dispatch({
            type: FETCH_DEALS_LIST_SUCCESS,
            payload: response,
          });
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
        this.ngRedux.dispatch({ type: FETCH_DEALS_LIST_ERROR, payload: err });
      },
    });
    this.Subscriptions.push(subscription);
  }

  _LoadDealsList() {
    // this.ngRedux.dispatch({ type: FETCH_DEALS_LIST });
    // return this._http.get(this.GetAllDealsUrl).subscribe({
    //   next: (response: any) => {
    //
    //     if (response) {
    //       // return this.sendDealBehaviorMessage(response);
    //       console.log('this.dealsList: ', response);
    //       this.ngRedux.dispatch({
    //         type: FETCH_DEALS_LIST_SUCCESS,
    //         payload: response?.Data,
    //       });
    //     }
    //   },
    //   error: (err: any) => {
    //     console.warn('Error: ', err);
    //     this.ngRedux.dispatch({ type: FETCH_DEALS_LIST_ERROR, payload: err });
    //   },
    // });
  }

  ConvertNewCompanyLeadToDeal(Payload: ConvertNewCompanyLeadToDeal) {
    return this._http.post(this.ConvertNewCompanyLeadToDealUrl, Payload);
  }
  ConvertCompanyLeadToDeal(Payload: ConvertCompanyLeadToDeal) {
    return this._http.post(this.ConvertCompanyLeadToDealUrl, Payload);
  }

  LoadDealDetails(DealId: string) {
    this.ngRedux.dispatch({ type: FETCH_DEAL_DETAILS });
    let subscription = this._http
    // .get(`${this.GetDealDetailsUrl}/${DealId}`)
    // .get(`${this.GetDealDetailsNewUrl}/${DealId}`)
    .get(`${this.GetDealDetailsNew2Url}/${DealId}`)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.ngRedux.dispatch({
              type: FETCH_DEAL_DETAILS_SUCCESS,
              payload: response.Data,
            });
            this.ngRedux.dispatch({
              type: FETCH_DEAL_COMPANY_DETAILS_SUCCESS,
              payload: response.Data?.Companies,
            });
            const PrimaryContactDetails = {
              ContactEmail: response.Data?.ContactEmail,
              ContactFirstName: response.Data?.ContactFirstName,
              ContactLastName: response.Data?.ContactLastName,
              ContactPhoneNumber: response.Data?.ContactPhoneNumber,
            };
            this.ngRedux.dispatch({
              type: FETCH_DEAL_PRIMARY_CONTACT_DETAILS_SUCCESS,
              payload: PrimaryContactDetails,
            });
            this.ngRedux.dispatch({
              type: FETCH_DEAL_SECONDARY_CONTACT_LIST_SUCCESS,
              payload: response.Data?.Contacts,
            });
          }
        },
        error: (err: any) => {
          if (err) {
            this.ngRedux.dispatch({
              type: FETCH_DEAL_DETAILS_ERROR,
              payload: err,
            });
          }
        },
      });
    this.Subscriptions.push(subscription);
  }

  UpdateDeal(Deal: any, Id: string) {
    return this._http.put(`${this.UpdateDealUrl}/${Id}`, Deal);
  }

  // UpdateDealsList(DealsArray: [], Id: string) {
  //   this.DealsListBehaviorSubject.next(DealsArray);
  //   const data = JSON.stringify(DealsArray);
  //   this._http.patch(`${this.baseUrl}/${Id}`, data);
  // }

  AddDeal(NewDeal: any) {
    this.ngRedux.dispatch({ type: ADD_DEAL });
    let subscription = this._http.get(`${this.baseUrl}/1`).subscribe({
      next: (response: any) => {
        console.log('Get First Contact response: ', response);
        if (response) {
          // let updatedDealsList = response?.deals.push(NewDeal);
          let updatedDealsList = [...response?.deals, NewDeal];
          const Payload = { ...response, deals: updatedDealsList };
          let subscription = this._http
            .put(`${this.baseUrl}/1`, Payload)
            .subscribe({
              next: (response: any) => {
                this.ngRedux.dispatch({
                  type: ADD_DEAL_SUCCESS,
                  payload: response,
                });
                if (response) {
                  this._router.navigate(['/recruiter/crm/leads']);
                }
              },
              error: (err: any) => {
                console.warn('Error: ', err);
              },
            });
          this.Subscriptions.push(subscription);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });

    this.Subscriptions.push(subscription);
  }

  RemoveDeal(DealId: string) {
    console.log('DealId: ', DealId);
    this.ngRedux.dispatch({ type: REMOVE_DEAL });
    let subscription = this._http.get(`${this.baseUrl}`).subscribe({
      next: (response: any) => {
        if (response) {
          for (let i = 0; i < response.length; i++) {
            let deal = response[i].deals.filter((d: any) => {
              if (d.id != DealId) {
                return d;
              }
            });
            this.UpdateDealsCategory(
              Object.assign(response[i], { deals: deal }),
              response[i].id,
              DealActions.DELETE_DEAL
            );
          }
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
        this.ngRedux.dispatch({ type: REMOVE_DEAL_ERROR, payload: err });
      },
    });
    this.Subscriptions.push(subscription);
  }

  _RemoveDeal(DealId: string, Parent: any) {
    this.ngRedux.dispatch({ type: REMOVE_DEAL });
    let subscription = this._http
      .delete(`${this.RemoveGroupDealsUrl}/${DealId}`)
      .subscribe({
        next: (response: any) => {
          if (response) {
            const Payload = {
              dealId: DealId,
              stage: Parent,
            };

            this.ngRedux.dispatch({
              type: REMOVE_DEAL_SUCCESS,
              payload: Payload,
            });
            this.toastr.success('Deal removed successfully', 'Success');
            this.LoadGroupDeals();
            this.LoadGroupedDealsCase();
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
          this.ngRedux.dispatch({ type: REMOVE_DEAL_ERROR, payload: err });
        },
      });
    this.Subscriptions.push(subscription);
  }

  UpdateDealsCategory(
    Category: any,
    CategoryId: string,
    DealActions: DealActions
  ) {
    let subscription = this._http
      .put(`${this.baseUrl}/${CategoryId}`, Category)
      .subscribe({
        next: (response: any) => {
          if (response) {
            if (DealActions == 'DELETE_DEAL') {
              this.ngRedux.dispatch({
                type: REMOVE_DEAL_SUCCESS,
                payload: response,
              });
            }
            this.LoadDealsList();
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.Subscriptions.push(subscription);
  }

  AddDealContact(DealId: string, Contact: DealContact) {
    return this._http.post(`${this.AddDealContactUrl}/${DealId}`, Contact);
  }

  UpdateContact(DealId: string, Payload: UpdateDealContact) {
    return this._http.put(`${this.UpdateContactUrl}/${DealId}`, Payload);
  }

  UpdateStage(Payload: any) {
    const UpdateStage: UpdateStage = {
      stage: Payload?.stage,
      dealId: Payload?.dealId,
    };
    return this._http.put(
      `${this.UpdateStageUrl}/${UpdateStage?.dealId}?stage=${UpdateStage?.stage}`,
      UpdateStage
    );
  }

  UpdateJobWithDeal(JobId: string, DealId: string, JobVacancy: any) {
    return this._http.put(
      `${this.DealsUrl}${JobId}/update_job/${DealId}`,
      JobVacancy
    );
  }
  SendDealEmailMessage(Payload: SendDealMail) {
    return this._http.post(this.SendEmailUrl, Payload);
  }


  GetDealActivities(DealId: string) {
    return this._http.get(
      `${this.GetDealActivitiesUrl}/${DealId}`);
  }

  TransferDeal(Payload: TransferDeal) {
    return this._http.patch(this.TransferDealUrl, Payload)
  }



  ngOnDestroy(): void {
    this.Subscriptions.forEach((s) => {
      if (!s.closed) {
        s.unsubscribe();
      }
    });
  }
}
enum DealActions {
  DELETE_DEAL = 'DELETE_DEAL',
  UPDATE_DEAL = 'UPDATE_DEAL',
}

export interface UpdateStage {
  stage: string;
  dealId: string;
}

export interface SendDealMail {
  Subject: string;
  DealId: string;
  Body: string;
  Destination: any[];
}
export interface TransferDeal {
  UserId: string;
  DealId: string;
}