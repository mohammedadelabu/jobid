export interface AddProject {
  ProjectName: 'string';
  CompanyId: 'string';
  Hours: 'string';
  TriggerName: 'string';
  TimeTrigger: 'string';
  UpdatedBy: 'string';
}

export interface UpdateProject {
  ProjectName: 'string';
  CompanyId: 'string';
  Hours: any;
  TriggerName: 'string';
  TimeTrigger: 'string';
  UpdatedBy: 'string';
}

export interface PatchProject {
  Status: 'string';
}
