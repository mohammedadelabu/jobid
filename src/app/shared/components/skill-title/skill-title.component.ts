import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill-title',
  templateUrl: './skill-title.component.html',
  styleUrls: ['./skill-title.component.scss'],
})
export class SkillTitleComponent implements OnInit, OnDestroy {
  @Input('skillCategoryId') skillCategoryId!: number;
  title: any;
  subscriptions: Subscription[] = [];
  constructor(private _skillSvc: SkillService) {}

  ngOnInit(): void {
    this.getTitle();
  }

  getTitle() {
    let subscription = this._skillSvc.getSkillsCategories().subscribe({
      next: (response: any) => {
        const dataArray = response?.Data;
        let x = dataArray.filter((item: any) => {
          return item.CategoryId === this.skillCategoryId;
        });
        this.title = x[0]?.CategoryName;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
