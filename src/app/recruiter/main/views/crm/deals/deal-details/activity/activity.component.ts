import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DealService } from 'src/app/services/deal.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  @select((s) => s.deals.dealDetails) dealDetails$: any;
  items = items;
  expandedIndex = 0;
  Subscriptions: Subscription[] = [];
  dealDetails: any;
  dealId: any;
  EMAIL_ACTIVITY = ActivityType.EMAIL_ACTIVITY;
  ASSIGN_TASK_ACTIVITY = ActivityType.ASSIGN_TASK_ACTIVITY;
  MESSAGE_ACTIVITY = ActivityType.MESSAGE_ACTIVITY;
  activityList: any;
  constructor(public dialog: MatDialog, private _dealSvc: DealService,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.DealDetails();
  }




  DealDetails() {
    let subscription = this.dealDetails$.subscribe({
      next: (deal: any) => {
        if (deal) {
          // console.log('deal: ', deal);
          this.dealDetails = deal;
          this._dealSvc.GetDealActivities(this.dealDetails?.Id);
          this.GetDealActivityList(this.dealDetails?.Id)
        }
      },
      error: (err: any) => {
        if (err) {

        }
      },
    });
    this.Subscriptions.push(subscription);
  }


  GetDealActivityList(DealId: string) {
    this._dealSvc.GetDealActivities(DealId).subscribe({
      next: (activities: any) => {
        if (activities) {
          console.log('activities: ', activities);
          this.activityList = activities?.Data;
        }
      },
      error: (err: any) => {
        if (err) {

        }
      },
    })
  }

}



// items = ['Today', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

export enum ActivityType {
  EMAIL_ACTIVITY = 'EMAIL_ACTIVITY',
  ASSIGN_TASK_ACTIVITY = 'ASSIGN_TASK_ACTIVITY',
  MESSAGE_ACTIVITY = 'MESSAGE_ACTIVITY'
}
const items = [
  {
    date: 'Today',
    activityList: [
      {
        id: 1,
        type: ActivityType.EMAIL_ACTIVITY,
        title: 'Integer arcu ex, consequat',
        email: 'dolores.chambers@example.com',
        date: '3:59:00  7 January 2021',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae at tincidunt elit. Tortor non metus et amet sagittis, et lorem nullam fames. Cursus scelerisque enim mattis in ornare sit lacinia facilisis. Quam in sit commodo mollis neque ultricies urna.',
        sender: {
          name: 'Mick Barne',
          title: 'Senior Account Manager',
          company: 'Zarttech B.V. The Netherlands (HQ)',
          phoneNumber: '+31 85 208 2627',
          website: 'www.zarttech.com',
        },
      },
      {
        id: 12,
        type: ActivityType.ASSIGN_TASK_ACTIVITY,
        task: {
          name: 'Implementation and user authentication',
          date: '3:59:00 7 January 2021',
          dueDate: '25 May',
          assignor: {
            name: '',
            profileImageUrl:
              '../../../../../../../../assets/images/candidate-test-avatar-1.png',
          },
          assignee: [
            {
              name: '',
              profileImageUrl:
                '../../../../../../../../assets/images/candidate-test-avatar-1.png',
            },
            {
              name: '',
              profileImageUrl:
                '../../../../../../../../assets/images/candidate-test-avatar-1.png',
            },
            {
              name: '',
              profileImageUrl:
                '../../../../../../../../assets/images/candidate-test-avatar-1.png',
            },
            {
              name: '',
              profileImageUrl:
                '../../../../../../../../assets/images/candidate-test-avatar-1.png',
            },
            {
              name: '',
              profileImageUrl:
                '../../../../../../../../assets/images/candidate-test-avatar-1.png',
            },
          ],
        },
      },
      {
        id: 3,
        type: ActivityType.MESSAGE_ACTIVITY,
        message: {
          title: '',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae at tincidunt elit. Tortor non metus et amet sagittis, et lorem nullam fames. Cursus scelerisque enim mattis in ornare sit lacinia facilisis. Quam in sit commodo mollis neque ultricies urna.',
        },
      },
    ],
  },
];



// {
//   "type": "EMAIL_ACTIVITY",
//   "title": null,
//   "email": "ibrahim.m@zarttech.com",
//   "body": "dd",
//   "Identifier": "1c444153-0e4f-420e-f023-08dad6b09a5a",
//   "IdentifierTitle": "deal",
//   "DealId": "b79f2725-d5bf-4730-ea6f-08dad53cbb16",
//   "sender": {
//       "name": null,
//       "title": "",
//       "company": "Amazon Web Services",
//       "phoneNumber": "+31 234567",
//       "website": "aws.amazon.com"
//   },
//   "date": "2022-12-05T11:05:21.8766681"
// }