import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  @Input('skills') skills: any;
  skillsList: any;
  skillTitleStyle = {
    'font-weight': '600',
    color: '#14323e',
    'font-size': '16px',
    'margin-bottom': '8px',
    'line-height': '24px',
    'text-transform': 'lowercase',

    // font-weight: 600;
    // font-size: 16px;
    // line-height: 24px;
    // color: #14323e;
    // margin-bottom: 8px;
  };
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewChecked() {
    setTimeout(() => {
      if (this.skills) {
        this.skillsList = this.skills?.Data;
      }
    }, 0);
  }
}
