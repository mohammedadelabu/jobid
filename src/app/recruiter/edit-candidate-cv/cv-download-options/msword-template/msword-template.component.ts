import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-msword-template',
  templateUrl: './msword-template.component.html',
  styleUrls: ['./msword-template.component.scss'],
})
export class MswordTemplateComponent implements OnInit {
  @Input('candidateProfileUserInfo') candidateProfileUserInfo: any;
  @Input('candidateSummary') candidateSummary: any;
  @Input('recruiterOpinion') recruiterOpinion: any;
  @Input('candidateProfile') candidateProfile: any;
  @Input('candidateSkillList') candidateSkillList: any;
  @Input('workHistory') workHistory: any;
  @Input('projectList') projectList: any;
  
  
  constructor() {}

  ngOnInit(): void {
  }
}
