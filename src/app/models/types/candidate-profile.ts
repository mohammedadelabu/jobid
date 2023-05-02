import { Candidate } from './candidate';

export interface Profile {
  Id?: string;
  Profession: string;
  Country: string;
  State: string;
  PostalCode: string;
  PortfolioPlatform: string;
  LinkedinPlatform: string;
  UpdatedBy: string;
  LastUpdate: string;
  //
  UserId: string;
  User: Candidate;
}

export interface CandidateProfile {
  Profession: string;
  Country: string;
  State: string;
  PostalCode: string;
  City: string;
  Street: string;
  PortfolioPlatform: string;
  LinkedinPlatform: string;
  UpdatedBy: string;
  Guarantor1_FullName?: string;
  GuarantorI_RelationshipToKin?: string;
  GuarantorI_Phone?: string;
  GuarantorI_EmailAddress?: string;
  Guarantor2_Fullname?: string;
  Guarantor2_RelationshipToKin?: string;
  Guarantor2_PhoneNumber?: string;
  Guarantor2_EmailAddress?: string;
}
