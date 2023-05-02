import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-project-remaining-hours',
  templateUrl: './project-remaining-hours.component.html',
  styleUrls: ['./project-remaining-hours.component.scss'],
})
export class ProjectRemainingHoursComponent implements OnInit {
  @Input('data') data: any;
  @Output() projectRemainingHoursDetails = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.setProjectHours();
    // console.log(this.getTimeTracked(15335000)); // 👉️ 04:16 (4 hours, 15 minutes, 35 seconds)
  }

  getHoursDetails(data: any) {
    this.projectRemainingHoursDetails.emit(data);
  }

  trackedTimeInMilliSecs: any;
  remainingTimeInMilliSecs: any;
  setProjectHours() {
    const createdDate = new Date(this.data.CreatedTime);
    const currentDate = new Date(Date.now());
    const createdDateToMilliSecs = createdDate.getTime();
    const currentDateToMilliSecs = currentDate.getTime();

    const hoursToMilliSecs = Number(this.data.Hours) * 1000 * 60 * 60;
    const dueTime = Number(createdDateToMilliSecs) + Number(hoursToMilliSecs);

    if (Number(currentDate.getTime()) - dueTime >= 0) {
      this.remainingTimeInMilliSecs = this.getTimeTracked(0);
    } else {
      this.remainingTimeInMilliSecs = this.getTimeTracked(
        Math.abs(currentDate.getTime() - dueTime)
      );
    }
  }

  displayTime(num: any) {
    return num.toString().padStart(2, '0');
  }

  getTimeTracked(milliseconds: any) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;

    return `${this.displayTime(hours)}:${this.displayTime(minutes)}`;
  }
}
