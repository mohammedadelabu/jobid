import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-number-of-employees-form',
  templateUrl: './number-of-employees-form.component.html',
  styleUrls: ['./number-of-employees-form.component.scss'],
})
export class NumberOfEmployeesFormComponent implements OnInit {
  @Output() onNumberOfEmployeesDone = new EventEmitter();
  numberOfEmployees: number[] = [];
  x = 1;
  constructor() {}

  ngOnInit(): void {
    while (this.x < 20) {
      this.numberOfEmployees.push(this.x);
      this.x++;
    }
  }

  numberOfEmployeesDone() {
    this.onNumberOfEmployeesDone.emit();
  }
}
