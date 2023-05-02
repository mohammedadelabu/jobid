import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input('data') data: any;

  
  constructor() { }

  ngOnInit(): void {
    console.log('data',this.data)
  }

}
