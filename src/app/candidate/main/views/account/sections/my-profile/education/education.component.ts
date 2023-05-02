import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent implements OnInit {
  @Input('education') education: any;
  educationList: any;

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewChecked() {
    setTimeout(() => {
      if (this.education) {
        this.educationList = this.education?.Data;
      }
    }, 0);
  }
}
