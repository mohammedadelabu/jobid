import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
})
export class WorkExperienceComponent implements OnInit {
  @Input('workExperience') workExperience: any;
  experience: any;

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewChecked() {
    setTimeout(() => {
      if (this.workExperience) {
        this.experience = this.workExperience?.Data;
      }
    }, 0);
  }
}
