import { Component, Input, OnInit } from '@angular/core';
import { JobApplicationStageService } from 'src/app/services/job-application-stage.service';

@Component({
  selector: 'app-application-process-count',
  templateUrl: './application-process-count.component.html',
  styleUrls: ['./application-process-count.component.scss'],
})
export class ApplicationProcessCountComponent implements OnInit {
  @Input('application') application: any;
  applicationProcessListCount: any;
  constructor(private _jobApplicationStageSvc: JobApplicationStageService) {}

  ngOnInit(): void {
    // this.onGetApplicationProcess(this.application.Id);
  }

  // onGetApplicationProcess(ApplicationId: string) {
  //   this._jobApplicationStageSvc
  //     .getApplicationProcessStageByApplicationId(ApplicationId)
  //     .subscribe({
  //       next: (response: any) => {
  //         // 
  //         if (response.ResponseCode == '00') {
  //           this.applicationProcessListCount = response?.Data?.length;
  //           // console.log('count======>: ', this.applicationProcessListCount);
  //         }
  //       },
  //       error: (err: any) => {
  //         console.warn('Error: ', err);
  //       },
  //     });
  // }
}
