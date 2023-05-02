export interface AddCompany__ {
  Name: string,
  ContactDetails?: string,
  Address: string,
  Description: string,
  Location: string,
  Size: string,
  Website: string,
  VATReistration: string,
  EmailAddress: string,
  LogoUrl: string,
  UpdatedBy: string,
  ContactPerson1_FirstName: string,
  ContactPerson1_LastName: string,
  ContactPerson1_Email: string,
  ContactPerson1_Mobile: string,
  ContactPerson1_Role?: string,
  ContactPerson2_FirstName: string,
  ContactPerson2_LastName: string,
  ContactPerson2_Email: string,
  ContactPerson2_Mobile: string,
  ContactPerson2_Role?: string
  //
  InviteCompany?: boolean,
}

export interface AddCompany {
  Name: string;
  ContactDetails: string;
  Address: string;
  Description: string;
  Location: string;
  Size: string;
  Website: string;
  VATReistration: string;
  PhoneNumber: string;
  EmailAddress: string;
  LogoUrl: string;
  UpdatedBy: string;
  InviteCompany?: boolean;
  key?: any;
}
export interface UpdateCompany {
  Name: string,
  ContactDetails: string,
  Address: string,
  Description: string,
  Location: string,
  Size: string,
  Website: string,
  VATReistration: string,
  PhoneNumber: string,
  EmailAddress: string,
  LogoUrl: string,
  UpdatedBy: string,
  InviteCompany?: boolean,
  UserId?: string,
}



export interface Company {
  // Name: string;
  // ContactDetails: string;
  // Address: string;
  // Description: string;
  // Location: string;
  // Size: string;
  // Website: string;
  // VATReistration: string;
  // EmailAddress: string;
  // LogoUrl: string;
  // UpdatedBy: string;
  // key?:any;


  CompanyId: string,
  Name: string,
  ContactDetails?: string,
  Address: string,
  Description: string,
  Location: string,
  Size: string,
  Website: string,
  VATReistration: string,
  EmailAddress: string,
  LogoUrl: string,
  UpdatedBy: string,
  ContactPerson1_FirstName: string,
  ContactPerson1_LastName: string,
  ContactPerson1_Email: string,
  ContactPerson1_Mobile: string,
  ContactPerson1_Role?: string,
  ContactPerson2_FirstName: string,
  ContactPerson2_LastName: string,
  ContactPerson2_Email: string,
  ContactPerson2_Mobile: string,
  ContactPerson2_Role?: string
  //
  InviteCompany?: boolean,
  key?: any;
}

export interface CompanyResponse {
  CompanyId: string,
  Name: string,
  ContactDetails?: string,
  Address: string,
  Description: string,
  Location: string,
  Size: string,
  Website: string,
  VATReistration: string,
  EmailAddress: string,
  LogoUrl: string,
  UpdatedBy: string,
  ContactPerson1_FirstName: string,
  ContactPerson1_LastName: string,
  ContactPerson1_Email: string,
  ContactPerson1_Mobile: string,
  ContactPerson1_Role?: string,
  ContactPerson2_FirstName: string,
  ContactPerson2_LastName: string,
  ContactPerson2_Email: string,
  ContactPerson2_Mobile: string,
  ContactPerson2_Role?: string
  //
  InviteCompany?: boolean,
}
