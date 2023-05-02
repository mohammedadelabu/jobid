import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-project-hours',
  templateUrl: './project-hours.component.html',
  styleUrls: ['./project-hours.component.scss'],
})
export class ProjectHoursComponent implements OnInit {
  @Input('data') data: any;
  @Output() projectHoursDetails = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.setProjectHours();
    // console.log(this.getTimeTracked(15335000)); // 👉️ 04:16 (4 hours, 15 minutes, 35 seconds)
  }

  getHoursDetails(data: any) {
    this.projectHoursDetails.emit(data);
  }

  /*
logic for time tracked
  get time_created in milisecs
  get num of project hours
  convert num of project hours to milisecs
  add project-hours in milisecs to time-created in milisecs
  get current_time in millisecs
  compare new created time and current time if duration has elapsed
*/

  trackedTimeInMilliSecs: any;
  // remainingTimeInMilliSecs: any;
  setProjectHours() {
    const createdDate = new Date(this.data.CreatedTime);
    const currentDate = new Date(Date.now());
    const createdDateToMilliSecs = createdDate.getTime();
    const currentDateToMilliSecs = currentDate.getTime();

    const hoursToMilliSecs = Number(this.data.Hours) * 1000 * 60 * 60;
    const dueTime = Number(createdDateToMilliSecs) + Number(hoursToMilliSecs);

    if (Number(currentDate.getTime()) - dueTime >= 0) {
      // this.remainingTimeInMilliSecs = this.getTimeTracked(0);
      this.trackedTimeInMilliSecs = this.getTimeTracked(hoursToMilliSecs);
    } else {
      // x, currentTime,72 - duewTime48 = 24
      this.trackedTimeInMilliSecs = this.getTimeTracked(
        Math.abs(Number(currentDate.getTime()) - Number(createdDate.getTime()))
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
    // if seconds are greater than 30, round minutes up (optional)
    // minutes = seconds >= 30 ? minutes + 1 : minutes;

    minutes = minutes % 60;

    // If you don't want to roll hours over, e.g. 24 to 00
    // comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    // hours = hours % 24;

    return `${this.displayTime(hours)}:${this.displayTime(minutes)}`;
  }
}
