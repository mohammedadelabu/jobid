import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DownloadJobService {
  constructor() {}

  setJobTemplateParams(CompanyId: string, JobId: string) {
    const JOB_TO_DOWNLOAD = {
      JobId: JobId,
      CompanyId: CompanyId,
    };
    let x = JSON.stringify(JOB_TO_DOWNLOAD);
    localStorage.setItem('JOB_TO_DOWNLOAD_PARAMS', x);
  }

  getJobTemplateParams() {
    // let x = JSON.stringify(JOB_TO_DOWNLOAD);
    let jobToDownloadParams;
    let data: any = localStorage.getItem('JOB_TO_DOWNLOAD_PARAMS');
    if (data) {
      jobToDownloadParams = JSON.parse(data);
    }
    return jobToDownloadParams;
  }

  // setJobDownloadJobId(JobId: string) {
  //   localStorage.setItem('JOB_TO_DOWNLOAD_JOB_JOBID', JobId);
  // }

  // setJobDownloadCompanyId(CompanyId: string) {
  //   localStorage.setItem('JOB_TO_DOWNLOAD_JOB_COMPANY', CompanyId);
  // }

  // getJobDownloadJobId() {
  //   let jobId;
  //   let data: any = localStorage.getItem('JOB_TO_DOWNLOAD_JOB_JOBID');
  //   if (data) {
  //     jobId = data;
  //   }
  //   return jobId;
  // }
  // getJobDownloadCompanyId() {
  //   let companyId;
  //   let data: any = localStorage.getItem('JOB_TO_DOWNLOAD_JOB_COMPANY');
  //   if (data) {
  //     companyId = data;
  //   }
  //   return companyId;
  // }
}
