import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CompanyProcessService } from 'src/app/services/company-process.service';
// import { InterviewProcessService } from 'src/app/services/interview-process.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { VacancyProcessService } from 'src/app/services/vacancy-process.service';
import { EditCompanyProcessComponent } from '../edit-company-process/edit-company-process.component';

@Component({
  selector: 'app-preview-interview-process',
  templateUrl: './preview-interview-process.component.html',
  styleUrls: ['./preview-interview-process.component.scss'],
})
export class PreviewInterviewProcessComponent implements OnInit, OnDestroy {
  @Input('CompanyId') CompanyId: any;
  @Input('VacancyId') VacancyId: any;
  @Input('CompanyProcess') CompanyProcess: any;
  subscriptions: Subscription[] = [];

  processList: any;
  constructor(
    // private _interviewProcessSvc: InterviewProcessService,
    private _messengerSvc: MessengerService,
    // private _companyProcessSvc: CompanyProcessService,
    private _vacancyProcessSvc: VacancyProcessService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('CompanyId: ', this.CompanyId);
    this.getList();
    this.getSubjectMessage();
    let subscription = this._messengerSvc.getSubject().subscribe({
      next: (response: any) => {
        console.log('Interview Process List: ', response);
        if (response) {
          this.getList();
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  getList() {
    this.onGetInterviewProcessList(this.CompanyId);
  }

  onGetInterviewProcessList(CompanyId: string) {
    // this._interviewProcessSvc.getInterviewProcesses(JobId).subscribe({
    //   next: (response: any) => {
    //     console.log('Interview Process List: ', response);
    //     if (response) {
    //       if (response.ResponseCode == '00') {
    //         this.processList = response?.Data;
    //       }
    //     }
    //   },
    //   error: (err: any) => {
    //     console.warn('Error: ', err);
    //   },
    // });

    let subscription = this._vacancyProcessSvc
      .getVacancyProcess(this.VacancyId)
      .subscribe({
        next: (response: any) => {
          console.log('Interview Process List: ', response);
          if (response) {
            if (response.ResponseCode == '00') {
              this.processList = response?.Data;
            }
            if (response.ResponseCode == '404') {
              this.processList = [];
            }
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  getSubjectMessage() {
    let subscription = this._messengerSvc.getSubject().subscribe({
      next: (response: any) => {
        if (response) {
          console.log('Subject response: ', response);
          this.getList();
        }
      },
    });
    this.subscriptions.push(subscription);
  }

  onEditProcess(Process: any) {
    console.log('Process: ', Process);
    const dialogRef = this.dialog.open(EditCompanyProcessComponent, {
      width: '550px',
      data: {
        process: Process,
      },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {
      
    });
    this.subscriptions.push(subscription);
  }

  onRemoveProcess(ProcessId: string) {
    // alert(ProcessId);
    let subscription = this._vacancyProcessSvc
      .removeVacancyProcess(ProcessId)
      .subscribe({
        next: (response: any) => {
          console.log('Interview Process List: ', response);
          if (response) {
            this._messengerSvc.sendSubject('Process Deleted!');
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
