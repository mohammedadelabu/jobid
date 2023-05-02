import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';

@Component({
  selector: 'app-job-lists',
  templateUrl: './job-lists.component.html',
  styleUrls: ['./job-lists.component.scss'],
})
export class JobListsComponent implements OnInit {
  showToggle!: boolean;
  currentRoute!: string;

  constructor(
    public _jobVacancySvc: JobVacancyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.router.url);

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.showToggle = !this.currentRoute.includes('pending-posts');
      }
    });
  }

  onCardsToggle() {
    this._jobVacancySvc.toggleCards();
  }
}
