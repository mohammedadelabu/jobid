import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disclosed',
  templateUrl: './disclosed.component.html',
  styleUrls: ['./disclosed.component.scss']
})
export class DisclosedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onPrint() {
    const nav = document.querySelector('#template-nav');
    nav?.classList.add('d-none');
    setTimeout(() => {
      nav?.classList.remove('d-none');
    }, 2000);
    window.print();
  }
}
