import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { SecondaryNav } from '../../nav';

@Component({
  selector: 'app-secondary-nav',
  templateUrl: './secondary-nav.component.html',
  styleUrls: ['./secondary-nav.component.scss'],
})
export class SecondaryNavComponent implements OnInit {
  activeNav!: any;
  collapsed!: boolean;

  constructor(public sbService: SidebarService) {}

  ngOnInit(): void {
    this.sbService.secSidebarCollapsed.subscribe({
      next: (collapsed) => (this.collapsed = collapsed),
    });
    this.sbService.secondaryNavMenus.subscribe({
      next: (res) => {
        this.activeNav = res;
        console.log(this.activeNav);
      },
    });
  }

  toggleCollapse() {
    this.sbService.secSidebarCollapsed.next(true);
  }

  toggleShowSubNav(index: any) {
    this.activeNav.secondaryNav[index].showSubNav =
      !this.activeNav.secondaryNav[index].showSubNav;
  }

  setActiveSecondaryNav(navItem: SecondaryNav) {
    // if (this.sbService.secondaryNavMenus.value) {
    //   this.sbService.secondaryNavMenus.next({
    //     ...this.sbService.secondaryNavMenus.value,
    //     activeSecondaryTab: navItem.path,
    //   });
    // }
  }
}
