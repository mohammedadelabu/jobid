export class MapDeal {
  GroupedDealsList!: any;
  ApiDeal!: any;
  constructor(GroupedDealsList: any, ApiDeal: any) {
    // console.log('x GroupedDealsList: ', GroupedDealsList);
    // console.log('x ApiDeal: ', ApiDeal);
    this.GroupedDealsList = GroupedDealsList;
    this.ApiDeal = ApiDeal;
  }

  mapApiDealListToLocal() {
    this.ApiDeal.forEach((element: any) => {
      switch (element.Stage) {
        case DealStage.DISCOVERY:
          this.matchDealsData(element);
          break;
        case DealStage.HANDOVER:
          this.matchDealsData(element);
          break;
        case DealStage.INTERVIEW:
          this.matchDealsData(element);
          break;
        case DealStage.SOLD:
          this.matchDealsData(element);
          break;
        case DealStage.LOST:
          this.matchDealsData(element);
          break;

        default:
          break;
      }
    });
  }

  matchDealsData(data: any) {
    let x = this.GroupedDealsList.find((item: any) => {
      
      // item["deals"] = []; //reset the array before assigning a new one fron the api
      if(item.stage == data.Stage){
        item["deals"] = [];
        item.deals = data.Deals
        return item;
      }
    });
    
    x['deals'] = [...data.Deals];
    x['dealsCount'] = data.DealsCount;
    // console.log('x List: ', x);
    return  x;
  }
}

export enum DealStage {
  DISCOVERY = 'Discovery',
  HANDOVER = 'Handover',
  INTERVIEW = 'Interview',
  SOLD = 'Sold',
  LOST = 'Lost',
}
