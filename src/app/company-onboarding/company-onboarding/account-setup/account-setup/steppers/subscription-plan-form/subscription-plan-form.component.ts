import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-subscription-plan-form',
  templateUrl: './subscription-plan-form.component.html',
  styleUrls: ['./subscription-plan-form.component.scss']
})
export class SubscriptionPlanFormComponent implements OnInit {
  @Output() onSubscriptionPlanDone = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  subscriptionPlanDone() {
    this.onSubscriptionPlanDone.emit();
  }

}
