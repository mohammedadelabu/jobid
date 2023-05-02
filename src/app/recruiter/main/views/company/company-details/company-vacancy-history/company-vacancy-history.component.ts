import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-vacancy-history',
  templateUrl: './company-vacancy-history.component.html',
  styleUrls: ['./company-vacancy-history.component.scss'],
})
export class CompanyVacancyHistoryComponent implements OnInit {
  @Input('jobVacancyList') jobVacancyList!: [];
  constructor() {}

  ngOnInit(): void {}
}
