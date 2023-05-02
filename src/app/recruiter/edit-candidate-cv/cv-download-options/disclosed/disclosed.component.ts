import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disclosed',
  templateUrl: './disclosed.component.html',
  styleUrls: ['./disclosed.component.scss'],
})
export class DisclosedComponent implements OnInit {
  wsWordFormat!: boolean;

  constructor() {}

  ngOnInit(): void {}
  onPrint() {
    const nav = document.querySelector('#template-nav');
    nav?.classList.add('d-none');

    this.wsWordFormat = false;
    setTimeout(() => {
      nav?.classList.remove('d-none');
    }, 2000);
    window.print();
  }

  onMsWord() {
    // this.wsWordFormat = true;
    // setTimeout(() => {      
    // this.wsWordFormat = false;
    // }, 3500);
  }
}
