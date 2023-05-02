export interface DealsCase {
  id: number;
  stage: string;
  connectTo: string;
  deals: any[];
  dealsCount: number;

  // | { id: number; stage: string; deals: never[]; connectTo?: undefined;
}

// export interface Deal {
//   LeadId: string;
//   CompanyName: string;
//   CompanyEmail: string;
//   Address: string;
//   Location: string;
//   CompanySize: number;
//   Website: string;
//   VAT: string;
//   PhoneNumber: string;
//   Description: string;
//   CompanyLogo: string;
//   PrimaryContactFirstName: string;
//   PrimaryContactLastName: string;
//   PrimaryContactEmail: string;
//   PrimaryContactMobileNumber: string;
//   id: string;
//   date: string;
// }
// [];

export const DealsList: DealsCase[] = [
  {
    id: 1,
    stage: 'Discovery',
    connectTo: '2',
    deals: [],
    dealsCount: 0,
  },
  {
    id: 2,
    stage: 'Handover',
    connectTo: '3',
    deals: [],
    dealsCount: 0,
  },
  {
    id: 3,
    stage: 'Interview',
    connectTo: '4',
    deals: [],
    dealsCount: 0,
  },
  {
    id: 4,
    stage: 'Sold',
    connectTo: '1',
    deals: [],
    dealsCount: 0,
  },
  {
    id: 5,
    stage: 'Lost',
    connectTo: '4',
    deals: [],
    dealsCount: 0,
  },
];

// export class GroupedDealsCase {
//   DealsList: DealsCase[] = DealsList;

//   constructor() {}

//   getCase() {
//     console.log("this.DealsList: ", this.DealsList)
//     return this.DealsList;
//   }
// }
