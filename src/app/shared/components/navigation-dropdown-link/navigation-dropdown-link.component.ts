import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-dropdown-link',
  templateUrl: './navigation-dropdown-link.component.html',
  styleUrls: ['./navigation-dropdown-link.component.scss'],
})
export class NavigationDropdownLinkComponent implements OnInit {
  @Input() linkDetails!: any;
  isOpen = false;

  // dropDownsOpenState: { [key: string]: boolean } = {};

  constructor() {}

  ngOnInit(): void {
    // console.log('linkDetails: ', this.linkDetails);
    // this.linkDetails
    //   .filter(
    //     (linkDetail: { routeLink: string | null }) =>
    //       linkDetail.routeLink === null
    //   )
    //   .forEach((linkDetail: { title: string }) => {
    //     this.dropDownsOpenState[linkDetail.title] = false;
    //   });
    //   console.log(this.dropDownsOpenState)
  }

  openDropdown() {
    this.isOpen = !this.isOpen;
  }

  // toggleDropdown(linkDetail: { title: string }) {
  //   this.dropDownsOpenState = {
  //     ...this.dropDownsOpenState,
  //     [linkDetail.title]: !this.dropDownsOpenState[linkDetail.title],
  //   };
  // }
}
