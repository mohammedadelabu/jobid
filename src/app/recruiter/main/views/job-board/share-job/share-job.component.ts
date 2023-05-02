import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';

@Component({
  selector: 'app-share-job',
  templateUrl: './share-job.component.html',
  styleUrls: ['./share-job.component.scss'],
})
export class ShareJobComponent implements OnInit {
  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }

  constructor(private _jobVacancySvc: JobVacancyService) {}

  ngOnInit(): void {}

  onToggleShowDisclosedJob() {
    this._jobVacancySvc.toggleShowDisclosedJob();
    this.emitEventToChild();
  }
}
