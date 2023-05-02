import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-proceed-to-next-stage-button',
  templateUrl: './proceed-to-next-stage-button.component.html',
  styleUrls: ['./proceed-to-next-stage-button.component.scss']
})
export class ProceedToNextStageButtonComponent implements OnInit {
  @Input("application")application:any;
  @Input("ZarttechProcesses")ZarttechProcesses:any;

  constructor() { }

  ngOnInit(): void {
  }
  onNextInterviewProcess(Application: any) {
    console.log('Application: ', Application);
    console.log('ZarttechProcesses: ', this.ZarttechProcesses);
  }
}
