import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars-count',
  templateUrl: './stars-count.component.html',
  styleUrls: ['./stars-count.component.scss'],
})
export class StarsCountComponent implements OnInit {
  @Input('rate') rate!: number;
  starArr: any = [];
  emptyStars: any = [];
  constructor() {}

  ngOnInit(): void {
    let i = 0;
    while (i < this.rate) {
      this.starArr.push('item');
      console.log('starArr=>: ', this.starArr);
      i++;
    }

    let j = 0;
    let k = 5 - this.rate;
    while (j < k) {
      this.emptyStars.push('item');
      j++;
    }
  }
}
