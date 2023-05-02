import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InternalProcessService {
  internalProcessList: InternalProcess[] = [
    {
      Id: 1,
      Name: 'Code challenge',
      Value: 'Code challenge',
      IsDone: false,
    },
    {
      Id: 2,
      Name: 'Recruiter interview',
      Value: 'Recruiter interview',
      IsDone: false,
    },
    {
      Id: 3,
      Name: 'Technical interview',
      Value: 'Technical interview',
      IsDone: false,
    },
    {
      Id: 4,
      Name: 'Offered',
      Value: 'Offered',
      IsDone: false,
    },
    {
      Id: 5,
      Name: 'Contract signing',
      Value: 'Contract signing',
      IsDone: false,
    },
    {
      Id: 6,
      Name: 'Hired',
      Value: 'Hired',
      IsDone: false,
    },
  ];
  constructor() {}

  getInternalProcessList() {
    return this.internalProcessList;
  }
}

export interface InternalProcess {
  Id: number;
  Name: string;
  Value: string;
  IsDone: boolean;
}
