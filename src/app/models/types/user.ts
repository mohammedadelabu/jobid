export interface User {
  id: string;
  userName: string;
 normalizedUserName: string;
  email: string;
  NormalizedEmail: string;
  EmailConfirmed: boolean;
  PasswordHash: string;
  SecurityStamp: string;
  ConcurrencyStamp: string;
  PhoneNumber: string;
  PhoneNumberConfirmed: boolean;
  TwoFactorEnabled: boolean;
  LockoutEnd: string;
  LockoutEnabled: boolean;
  AccessFailedCount: number;
  Created_At: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  ForgotPasswordToken: string;
  ForgotPasswordTokenExpiry: string;
  ProfileImageUrl: string;
  Status: string;
  StatusComment: string;
  InvitedBy: string;
  Modified_At: string;
  CV_URL: string;
  OldReference: string;
  NewReference: string;
  SendMail: boolean;
  PasswordCreatedByAdmin: boolean;
  UpdatedBy: string;
}

export interface UpdateUser {
  FirstName: string;
  LastName: string;
  MiddleName: string;
  UserImage: string;
  PhoneNumber: string;
  Status: string;
  StatusComment: string;
  CV_URL: string;
  UpdatedBy: string;
  ProofOfResidence?: string;
  GovernmentId?: string;
  DateOfBirth?: string;
  CompanyId?: string;
  PortfolioPlatform?: string;
  LinkedinPlatform?: string;
  IsVerified?: boolean;
  NewReference?: string;
  IsEmailVerified?: boolean;
  IsPhoneNumberVerified?: boolean;
  Region?: string;
}

export interface CreateUserWithRole {
  // FirstName: string;
  // LastName: string;
  // MiddleName?: string;
  // Email: string;
  // Password: string;
  // SendMail?: boolean;
  // ConfirmPassword: string;
  // Role: string;
  // PhoneNumber?: string;
  // Status?: string;
  // InvitedBy?: string;
  // PasswordCreatedByAdmin?: boolean;
  // StatusComment?: string;
  // CV_URL?: string;

  Email: string;
  Password: string;
  SendMail: boolean;
  ConfirmPassword: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  Role: string;
  PhoneNumber: string;
  Status: string;
  InvitedBy?: string;
  PasswordCreatedByAdmin?: boolean;
  StatusComment: string;
  CV_URL: string;
  OldReference?: string;
  CompanyOrUser?: string;
  DateOfBirth?: string;
  Region?: string;
}

export interface AuthenticateUser {
  Email: string;
  Password: string;
  RememberMe: true;
}

export interface UserModel {
  AccessToken: string;
  Email: string;
  Id: string;
  RefreshToken: string;
  Role: [];
  UserName: string;
}

export interface UserRole {
  name: string;
  value: string;
}

export enum Region {
  AFRICA = 'Africa',
  EU = 'EU',
}
