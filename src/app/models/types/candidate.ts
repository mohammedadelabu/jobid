export interface Candidate {
    Id: string;
    UserName: string;
    Email: string;
    ConcurrencyStamp: string;
    PhoneNumber: string;
    PhoneNumberConfirmed: boolean;
    Created_At: string;
    FirstName: string;
    LastName: string;
    MiddleName: string;
    ProfileImageUrl: string;
    Status: string;
    StatusComment: string;
    InvitedBy: string;
    Modified_At: string;
    CV_URL: string;
    OldReference: string;
    NewReference: string;
    SendMail: boolean;
    UpdatedBy: string;
    key?:any;
}
