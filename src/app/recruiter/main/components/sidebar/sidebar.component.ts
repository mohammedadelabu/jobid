import { Component, OnInit } from '@angular/core';
import {
  AdminRoleAndPermissionService,
  RoleModule,
} from 'src/app/services/admin-role-and-permission.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'recruiter-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  DASHBOARD = RoleModule.DASHBOARD;
  CANDIDATES = RoleModule.CANDIDATES;
  COMPANY = RoleModule.COMPANY;
  RECRUITMENT = RoleModule.RECRUITMENT;
  PLACEMENT = RoleModule.PLACEMENT;
  CRM = RoleModule.CRM;
  PROJECT_MANAGEMENT = RoleModule.PROJECT_MANAGEMENT;
  JOB_BORD = RoleModule.JOB_BORD;
  FINANCIALS = RoleModule.FINANCIALS;
  CHAT = RoleModule.CHAT;

  navigationLinks = [
    {
      title: 'Dashboard',
      iconImageLink: '../../../../../assets/images/icons/dashboard-icon.svg',
      routeLink: '/recruiter/dashboard',
      appHasModule: null,
      dropMenu: [],
    },
    {
      title: 'Candidates',
      iconImageLink: '../../../../../assets/images/icons/candidates-icon.svg',
      routeLink: '/recruiter/candidates',
      appHasModule: this.CANDIDATES,
      dropMenu: [],
    },
    // {
    //   title: 'Company',
    //   iconImageLink: '../../../../../assets/images/icons/company-icon.svg',
    //   routeLink: '/recruiter/crm/companies',
    //   appHasModule: this.COMPANY,
    //   dropMenu: [],
    // },
    {
      title: 'Job Board',
      iconImageLink: '../../../../../assets/images/icons/job-board-icon.svg',
      routeLink: '/recruiter/employee-management/job-board',
      appHasModule: this.JOB_BORD,
      dropMenu: [],
    },
    {
      title: 'Recruitment',
      iconImageLink: '../../../../../assets/images/icons/recruitment-icon.svg',
      routeLink: '/recruiter/employee-management/recruitment',
      appHasModule: this.RECRUITMENT,
      dropMenu: [],
    },
    {
      title: 'Placement',
      iconImageLink: '../../../../../assets/images/icons/placement-icon.svg',
      routeLink: '/recruiter/placement',
      appHasModule: this.PLACEMENT,
      dropMenu: [],
    },
    {
      title: 'CRM',
      iconImageLink:
        '../../../../../assets/images/icons/briefcase-green-icon.svg',
      routeLink: null,
      appHasModule: this.CRM,
      dropMenu: [
        {
          title: 'Leads',
          iconImageLink:
            '../../../../../assets/images/icons/briefcase-green-icon.svg',
          routeLink: '/recruiter/crm/leads',
        },
        {
          title: 'Deals',
          iconImageLink:
            '../../../../../assets/images/icons/briefcase-green-icon.svg',
          routeLink: '/recruiter/crm/deals',
        },
        {
          title: 'Contacts',
          iconImageLink:
            '../../../../../assets/images/icons/briefcase-green-icon.svg',
          routeLink: '/recruiter/crm/contacts',
        },
        {
          title: 'Task',
          iconImageLink:
            '../../../../../assets/images/icons/briefcase-green-icon.svg',
          routeLink: '/recruiter/crm/task',
        },
        {
          title: 'Companies',
          iconImageLink: '../../../../../assets/images/icons/company-icon.svg',
          routeLink: '/recruiter/crm/companies',
        },
      ],
    },
    {
      title: 'Project',
      iconImageLink:
        '../../../../../assets/images/icons/project-management-icon.svg',
      routeLink: null,
      appHasModule: this.PROJECT_MANAGEMENT,
      dropMenu: [
        {
          title: 'Calendar',
          iconImageLink:
            '../../../../../assets/images/icons/timesheet-icon.svg',
          routeLink: '/recruiter/project-management/calendar',
        },
        {
          title: 'Project',
          iconImageLink:
            '../../../../../assets/images/icons/timesheet-icon.svg',
          routeLink: '/recruiter/project-management/project',
        },
        {
          title: 'Todo',
          iconImageLink:
            '../../../../../assets/images/icons/timesheet-icon.svg',
          routeLink: '/recruiter/project-management/todo',
        },
        {
          title: 'Timesheet',
          iconImageLink:
            '../../../../../assets/images/icons/timesheet-icon.svg',
          routeLink: '/recruiter/project-management/timesheet',
        },
      ],
    },
    {
      title: 'Financials',
      iconImageLink: '../../../../../assets/images/icons/financials-icon.svg',
      routeLink: '/recruiter/Placement',
      appHasModule: this.FINANCIALS,
      dropMenu: [
        {
          title: 'Invoicing',
          iconImageLink:
            '../../../../../assets/images/icons/financials-icon.svg',
          routeLink: '/recruiter/project-management/project',
        },
        {
          title: 'Payroll',
          iconImageLink:
            '../../../../../assets/images/icons/financials-icon.svg',
          routeLink: '/recruiter/project-management/project',
        },
      ],
    },
    {
      title: 'Chat',
      iconImageLink: '../../../../../assets/images/icons/chat-icon.svg',
      routeLink: '/recruiter/chat',
      appHasModule: null,
      dropMenu: [],
    },
    {
      title: 'Settings',
      iconImageLink: '../../../../../assets/images/icons/settings-icon.svg',
      routeLink: '/recruiter/settings',
      appHasModule: null,
      dropMenu: [],
    },
  ];

  showCRMSubMenus = false;
  showProjectsSubMenus = false;

  constructor(private _authSvc: AuthenticationService) {}

  ngOnInit(): void {}

  logoutUser() {
    this._authSvc.logoutUser();
  }

  toggleCRMSubMenus() {
    this.showCRMSubMenus = !this.showCRMSubMenus;
  }

  toggleProjectsSubMenus() {
    this.showProjectsSubMenus = !this.showProjectsSubMenus;
  }
}
