export interface AddJobVacancy {

  // JobTitle: string;
  // JobDescription: string;
  // JobType: string;
  // JobLocation: string;
  // SalaryRange: string;
  // JobCategory: string;
  // JobEffective: string;
  // StartDate: string;
  // EndDate: string;
  // HoursAWeek: string;
  // HourlyRate: string;
  // IsClosed: boolean;
  // JobExpire: string;
  // PublishJob: boolean;
  // Body: string;
  // CompanyId: string;
  // UpdatedBy: string;
  // Recruiter: string;
  // RecruisitionStatus: string;

  // 

  JobTitle: string;
  JobDescription: string;
  JobType: string;
  JobLocation: string;
  SalaryRange: string;
  JobCategory?: string;
  JobEffective?: string;
  StartDate: string;
  EndDate: string;
  HoursAWeek: string;
  HourlyRate: string;
  IsClosed: boolean;
  JobExpire?: string;
  PublishJob: boolean;
  Body?: string;
  CompanyId: string;
  UpdatedBy: string;
  Recruiter?: string;
  RecruisitionStatus?: string;
  JobExperience: string;
  Certification: string;
  ContactDetail?: string;
  LanguageId: string;
  jobQuestion?: jobQuestion[];
  jobSkills?: jobSkill[];
  interviewStages?: interviewStage[];
  LocationId: string;
  SalePerson?: SalePerson;
}

// export interface CreateNewJob {
//   JobTitle: string;
//   JobDescription: string;
//   JobType: string;
//   JobLocation: string;
//   SalaryRange: string;
//   JobCategory: string;
//   JobEffective: string;
//   StartDate: string;
//   EndDate: string;
//   HoursAWeek: string;
//   HourlyRate: string;
//   IsClosed: boolean;
//   JobExpire: string;
//   PublishJob: boolean;
//   Body: string;
//   CompanyId: string;
//   UpdatedBy: string;
//   Recruiter: string;
//   RecruisitionStatus: string;
//   JobExperience: string;
//   Certification: string;
//   ContactDetail: string;
//   LanguageId: string;
//   jobQuestion?: jobQuestion[];
//   jobSkills?: jobSkill[];
//   interviewStages?: interviewStage[];
//   LocationId: string;
//   SalePerson?: SalePerson;
// }

interface SalePerson {
  FirstName: string;
  Lastname: string;
  PhoneNumber: string;
  Email: string;
}

interface interviewStage {
  InterviewName: string;
  InterviewDate: string;
}

interface jobSkill {
  SkillName: string;
}

interface jobQuestion {
  Question: string;
  InputType: string;
  Options: string[];
}
