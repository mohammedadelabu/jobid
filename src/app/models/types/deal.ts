import { AddCompany } from './company';

export interface Deal {
  LeadId: string;
  Address: string;
  CompanyEmail: string;
  CompanyName: string;
  CompanySize: number;
  Description: string;
  PrimaryContactEmail: string;
  PrimaryContactFirstName: string;
  PrimaryContactLastName: string;
  PrimaryContactMobileNumber: string;
  Location: string;
  PhoneNumber: string;
  VAT: string;
  Website: string;
}

export interface ConvertCompanyLeadToDeal {
  LeadId: string;
  CompanyId: string;
}

export interface ConvertNewCompanyLeadToDeal{
  LeadId: string;
  Company?: AddCompany;
  ContactFirstName: string;
  ContactLastName: string;
  ContactEmail: string;
  ContactPhoneNumber: string;
}

export interface DealContact {
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  PhoneNumber: string;
}

export interface UpdateDealContact {
  Id: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  PhoneNumber: string;
}
