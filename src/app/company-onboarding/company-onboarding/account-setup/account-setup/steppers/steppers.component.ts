import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-steppers',
  templateUrl: './steppers.component.html',
  styleUrls: ['./steppers.component.scss'],
})
export class SteppersComponent implements OnInit {
  moduleSection: any[] = [
    {
      title: 'Select your preferred module',
      expanded: false,
      instruction: 'select multiple',
    },
  ];
  numberOfEmployees: any[] = [
    {
      title: 'How many employees to be onboarded',
      expanded: false,
      instruction: null,
    },
  ];
  subscriptionPlan: any[] = [
    {
      title: 'Subscription plan',
      expanded: false,
      instruction: null,
    },
  ];
  expandedIndex = 0;
  moduleSelectionFormDone: boolean = false;
  numberOfEmployeesFormDone: boolean = false;
  subscriptionPlanFormDone: boolean = false;
  
  constructor() {}

  ngOnInit(): void {}

  toggle(item: any) {
    item.expanded = !item.expanded;
  }

  onModuleSelectionDone() {
    this.moduleSelectionFormDone = true;
    this.moduleSection[0].expanded = false;
    this.numberOfEmployees[0].expanded = true;
  }
  onNumberOfEmployeesDone() {
    this.numberOfEmployeesFormDone = true;
    this.numberOfEmployees[0].expanded = false;
    this.subscriptionPlan[0].expanded = true;
  }

  onSubscriptionPlanDone(){
    this.subscriptionPlanFormDone = true;
  }
}
