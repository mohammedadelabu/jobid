import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deals-alt',
  templateUrl: './deals-alt.component.html',
  styleUrls: ['./deals-alt.component.scss'],
})
export class DealsAltComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  FirstContact = {
    title: 'First contact',
    deals: [
      {
        name: 'Henderson co.',
        phone: '(704) 555-0127.',
        status: 'New client',
        date: '17/05/2022',
      },
      {
        name: 'Zarttech.',
        phone: '(234) 234-1099.',
        status: 'New client',
        date: '03/07/2022',
      },
    ],
  };
  Handovers = {
    title: 'First contact',
    deals: [],
  };
  InterviewsAssessments = {
    title: 'Interviews assessments',
    deals: [],
  };
  ContractDeliberation = {
    title: 'Contract deliberation',
    deals: [],
  };
  Sold = {
    title: 'Sold',
    deals: [],
  };
  // dealsList: any[] = [
  //   {
  //     id: '1',
  //     title: 'First contact',
  //     connectedTo: 'handovers',
  //     listRef: 'firstContact',
  //     deals: [
  //       {
  //         name: 'Henderson co.',
  //         phone: '(704) 555-0127.',
  //         status: 'New client',
  //         date: '17/05/2022',
  //       },
  //       {
  //         name: 'Zarttech.',
  //         phone: '(234) 234-1099.',
  //         status: 'New client',
  //         date: '03/07/2022',
  //       },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     title: 'Handovers',
  //     connectedTo: 'interviewsAssessments',
  //     listRef: 'handovers',
  //     deals: [],
  //   },
  //   {
  //     id: '3',
  //     title: 'Interviews assessments',
  //     connectedTo: 'contractDeliberation',
  //     listRef: 'interviewsAssessments',
  //     deals: [],
  //   },
  //   {
  //     id: '4',
  //     title: 'Contract deliberation',
  //     connectedTo: 'sold',
  //     listRef: 'contractDeliberation',
  //     deals: [],
  //   },
  //   {
  //     id: '5',
  //     title: 'Sold',
  //     connectedTo: 'firstContact',
  //     listRef: 'sold',
  //     deals: [],
  //   },
  // ];

  dealsList: any[] = [
    {
      id: '1',
      title: 'First contact',
      connectedTo: 'handovers',
      listRef: 'firstContact',
      deals: [
        {
          name: 'Henderson co.',
          phone: '(704) 555-0127.',
          status: 'New client',
          date: '17/05/2022',
        },
        {
          name: 'Zarttech.',
          phone: '(234) 234-1099.',
          status: 'New client',
          date: '03/07/2022',
        },
      ],
    },
    {
      id: '2',
      title: 'Handovers',
      connectedTo: 'interviewsAssessments',
      listRef: 'handovers',
      deals: [],
    },
    {
      id: '3',
      title: 'Interviews assessments',
      connectedTo: 'contractDeliberation',
      listRef: 'interviewsAssessments',
      deals: [],
    },
    {
      id: '4',
      title: 'Contract deliberation',
      connectedTo: 'sold',
      listRef: 'contractDeliberation',
      deals: [],
    },
    {
      id: '5',
      title: 'Sold',
      connectedTo: 'firstContact',
      listRef: 'sold',
      deals: [],
    },
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onScrollRight() {
    let container: any = document.getElementById('progress-space');
    container.scrollLeft += 20;
    console.log('container: ', container);
  }

  onScrollLeft() {
    let container: any = document.getElementById('progress-space');
    container.scrollLeft -= 20;
    console.log('container: ', container);
  }
}
