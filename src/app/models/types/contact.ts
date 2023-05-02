export interface Contact {}
export interface AddContact {
  FirstName: string;
  LastName: string;
  CompanyName: string;
  EmailAddress: string;
  PhoneNumber: string;
  AnnualRevenue?: number;
}

export interface AddIdentifiedContact {
  FirstName: string;
  LastName: string;
  CompanyName: string;
  EmailAddress: string;
  PhoneNumber: string;
  AnnualRevenue?: 0;
  Identifier: string;
}
