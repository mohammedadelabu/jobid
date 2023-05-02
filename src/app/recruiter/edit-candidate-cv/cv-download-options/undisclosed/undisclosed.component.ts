import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-undisclosed',
  templateUrl: './undisclosed.component.html',
  styleUrls: ['./undisclosed.component.scss'],
})
export class UndisclosedComponent implements OnInit {
  isUndisclosed = true;
  wsWordFormat!: boolean;
  isHideNav: boolean = false;
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
