import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-onboarding',
  templateUrl: './company-onboarding.component.html',
  styleUrls: ['./company-onboarding.component.scss']
})
export class CompanyOnboardingComponent implements OnInit {
  isCollapse: boolean = true;
  navLinkList: any[] = [
    {
      name: "modules",
      link: "#"
    },
    {
      name: "how it works",
      link: "#"
    },
    {
      name: "pricing",
      link: "#"
    },
    {
      name: "clients",
      link: "#"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapse() {
    this.isCollapse = !this.isCollapse
  }

}
