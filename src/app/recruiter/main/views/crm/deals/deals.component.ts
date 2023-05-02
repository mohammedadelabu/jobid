import { NgRedux, select } from '@angular-redux/store';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DealService } from 'src/app/services/deal.service';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_DEALS_LIST,
  FETCH_DEALS_LIST_ERROR,
  FETCH_DEALS_LIST_SUCCESS,
  UPDATE_DEAL_STAGE,
  UPDATE_DEAL_STAGE_ERROR,
  UPDATE_DEAL_STAGE_SUCCESS,
} from 'src/STORE/_deal.store/deal.actions';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss'],
})
export class DealsComponent implements OnInit {
  @select((s) => s.deals.dealsList) dealsList$: any;
  @select((s) => s.deals.isLoading) isLoading$: any;

  dealsListArray: any;

  constructor(private _dealSvc: DealService, private _router: Router,
    private ngRedux: NgRedux<IAppState>,
    private toastr: ToastrService,
    ) {}

  ngOnInit(): void {
    this.onGetDealsList();
  }



  // isShow = false;
  doSomething($event: any) {
    console.log('event: ', $event.target);
    let x = $event.target.classList;
    if (!x.contains('drop')) {
      x.add('drop');
      // this.isShow = true;
    } else {
      x.remove('drop');
    }
  }

  onGetDealsList() {
    // this._dealSvc.LoadDealsList();
    this._dealSvc.LoadGroupDeals();
    this._dealSvc.LoadGroupedDealsCase();
    this.dealsList$.subscribe({
      next: (response: any) => {
        if (response) {

          this.dealsListArray = response;
          // console.log('this.dealsListArray: ', this.dealsListArray);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }

  // onGetDealsList() {
  //   // this._dealSvc.LoadDealsList();
  //   // this._dealSvc.LoadGroupDeals();
  //   this._dealSvc.GetGroupedDealsCase();
  //   this.dealsList.subscribe({
  //     next: (response: any) => {
  //       if (response) {
  //         this.dealsListArray = response;
  //         console.log('this.dealsListArray: ', this.dealsListArray);
  //       }
  //     },
  //     error: (err: any) => {
  //       console.warn('Error: ', err);
  //     },
  //   });
  // }

  onRemoveDeal(Deal: any, Parent:any) {
    console.log('Deal: ', Deal);
    // this._dealSvc.RemoveDeal(Deal?.Id);
    this._dealSvc._RemoveDeal(Deal?.Id, Parent);
    console.log('DealId', Deal?.Id)
    console.log('Parent', Parent)
    
  }

  // onRemoveDeal(Deal: any) {
  //   console.log('Deal: ', Deal);
  //   this._dealSvc.RemoveDeal(Deal?.id);
  // }

  // onViewDetails(Parent: any, Deal: any) {
  //   console.log('Deal: ', Deal);
  //   this._router.navigate([`/recruiter/crm/deals/${Parent.id}/${Deal.id}`]);
  // }
  onViewDetails(Deal: any) {
    this._router.navigate([`/recruiter/crm/deals/${Deal.Id}`]);
  }

  // onUpdateDealsList() {
  //   this._dealSvc.UpdateDealsList(this.dealsList, this.dealsList?.id);
  //   this.onGetDealsList();
  // }

  drop(event: CdkDragDrop<any[]>, parent: any) {
    console.log('parent: ', parent);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateDealStage(event, parent);

      // this.onUpdateDealsList();
    }
  }

  updateDealStage(Event: any, NewParent: any) {
    const Payload = {
      stage: NewParent?.stage,
      dealId: Event?.item?.data?.Id,
    };
    this.ngRedux.dispatch({type: UPDATE_DEAL_STAGE})
    this._dealSvc.UpdateStage(Payload).subscribe({
      next: (response: any) => {
        if(response){
          this._dealSvc.LoadGroupDeals();
          this._dealSvc.LoadGroupedDealsCase();
          this.ngRedux.dispatch({type: UPDATE_DEAL_STAGE_SUCCESS, payload: Payload})
          //  window.location.reload();
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
          this.ngRedux.dispatch({type: UPDATE_DEAL_STAGE_ERROR, payload: err})
        }
      },
    });
  }

  onScrollRight() {
    let container: any = document.getElementById('progress-space');
    container.scrollLeft += 20;
  }

  onScrollLeft() {
    let container: any = document.getElementById('progress-space');
    container.scrollLeft -= 20;
  }
}
