import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IdentityService } from 'src/app/services/identity.service';
import { JobApplicationStageService } from 'src/app/services/job-application-stage.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';

@Component({
  selector: 'app-process-processor-widget',
  templateUrl: './process-processor-widget.component.html',
  styleUrls: ['./process-processor-widget.component.scss'],
})
export class ProcessProcessorWidgetComponent implements OnInit, OnDestroy {
  ProcessList: any;
  applicationProcessList: any;
  ProcessListTodo: any[] = [];
  updatedBy: any;
  subscriptions: Subscription[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { ZarttechProcesses: any; application: any },
    private _jobApplicationStageSvc: JobApplicationStageService,
    private _identitySvc: IdentityService,
    private _messengerSvc: MessengerService
  ) {}

  ngOnInit(): void {
    console.log('ZarttechProcesses: ', this.data.ZarttechProcesses);
    console.log('application: ', this.data.application);
    this.ProcessList = this.data.ZarttechProcesses;
    // this.getDoneApplicationProcessList(this.data.application?.Id);
  }

  ngAfterContentChecked() {}

  onGetUpdatedBy() {
    this.updatedBy = this._identitySvc.updatedBy();
    // console.log('updatedBy>>>: ', this.updatedBy);
    return this.updatedBy;
  }

  // getDoneApplicationProcessList(ApplicationId: string) {
  //   let subscription = this._jobApplicationStageSvc
  //     .getApplicationProcessStageByApplicationId(ApplicationId)
  //     .subscribe({
  //       next: (response: any) => {
  //         console.log('response>>>>: ', response);
  //         if (response) {
  //           this.applicationProcessList = response?.Data;
  //           this.getUncommonProcess(
  //             this.applicationProcessList,
  //             this.ProcessList
  //           );
  //           console.log(
  //             'this.applicationProcessList>>>>: ',
  //             this.applicationProcessList
  //           );
  //         }
  //       },
  //       error: (err: any) => {
  //         console.warn('Error: ', err);
  //       },
  //     });
  //   this.subscriptions.push(subscription);
  // }

  getUncommonProcess(array1: any, array2: any) {
    console.log('array1: ', array1, 'array2: ', array2);
    let anotherList: any = [];
    if (array1?.length && array2?.length) {
      array1?.forEach((element: any) => {
        let x = array2?.filter((ele: any) => {
          console.log('ele: ', ele);
          console.log('element: ', element);
          return ele.Id == element.VacancyProcessId;
        });
        console.log('x%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%55: ', x);
        if (x?.length) {
          // this.ProcessListTodo?.push(x[0]);
          anotherList?.push(x[0]);
        }
      });
    } else if (!array1?.length && array2?.length) {
      this.ProcessListTodo = array2;
    } else {
      this.ProcessListTodo = [];
    }

    console.log(
      'anotherList-----------------------------------: ',
      anotherList
    );
    this.ProcessListTodo = array2.filter(function (obj: any) {
      return anotherList.indexOf(obj) == -1;
    });
    console.log('this.ProcessListTodo==========>: ', this.ProcessListTodo);
  }

  onSubmit(processForm: any) {
    console.log('processForm.value: ', processForm.value);
    const Payload = {
      ApplicationId: this.data?.application?.Id,
      VacancyProcessId: processForm.value?.vacancyProcessId,
    };

    let w = this.ProcessListTodo.filter(
      (process: any) => process.Id == Payload.VacancyProcessId
    );
    console.log('w: ', w);
    const ProcessStage = {
      Status: w[0]?.Name,
      UpdatedBy: this.onGetUpdatedBy(),
      DateCompleted: new Date().toDateString(),
    };

    console.log('ProcessStage: ', ProcessStage);
    
    let subscription = this._jobApplicationStageSvc
      .AddApplicationProcessStage(Payload, ProcessStage)
      .subscribe({
        next: (response: any) => {
          console.log('rsponse: ', response);
          if (response) {
            this._messengerSvc.sendSubject('Process triggered!');
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
