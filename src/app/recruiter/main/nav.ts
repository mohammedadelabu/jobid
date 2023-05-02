import { RoleModule } from "src/app/services/admin-role-and-permission.service";

export enum PATHS {
  CRM = 'crm',
  PROJECT = 'project-management',
  EMPLOYEE = 'employee-management',
  DASHBOARD = 'dashboard',
  EVENTS = 'events',
  CALENDAR = 'calendar',
  ADMIN = 'admin',
  CHAT = 'chat',
  FINANCE = 'finance',
  SETTINGS = 'settings',
}

export type NavItem = {
  title: string;
  icon: string;
  path: PATHS;
  module?: RoleModule
  secondaryNav?: SecondaryNav[];
  // activeSecondaryTab?: string;
};

export type SecondaryNav = {
  title: string;
  path: string;
  subNavs?: { title: string; path: string }[];
  showSubNav?: boolean;
};

export const nav: NavItem[] = [
  {
    title: 'Dashboard',
    icon: 'dashboard-icon',
    path: PATHS.DASHBOARD,
  },
  {
    title: 'Employee Management',
    icon: 'employee-icon',
    path: PATHS.EMPLOYEE,
    module: RoleModule.JOB_BORD,
    secondaryNav: [
      // { title: 'Sales', path: 'sales' },
      { title: 'Job Board', path: 'job-board' },
      { title: 'Candidates', path: 'candidates' },
      { title: 'Recruitment', path: 'recruitment' },
      { title: 'Placement', path: 'placement' },
      // { title: 'Events', path: 'events' },
      // { title: 'Marketing', path: 'marketing' },
      // { title: 'Automation', path: 'automation' },
    ],
    // activeSecondaryTab: '',
  },
  {
    title: 'CRM',
    icon: 'crm-icon',
    path: PATHS.CRM,
    module: RoleModule.CRM,
    secondaryNav: [
      // { title: 'Sales', path: 'sales' },
      { title: 'Leads', path: 'leads' },
      { title: 'Deals', path: 'deals' },
      { title: 'Contacts', path: 'contacts' },
      { title: 'Tasks', path: 'task' },
      { title: 'Companies', path: 'companies' },
      // { title: 'Events', path: 'events' },
      // { title: 'Marketing', path: 'marketing' },
      // { title: 'Automation', path: 'automation' },
    ],
  },
  // {
  //   title: 'Events',
  //   icon: 'job-board-icon',
  //   path: PATHS.EVENTS,
  // },
  // {
  //   title: 'Calendar',
  //   icon: 'recruitment-icon',
  //   path: PATHS.CALENDAR,
  // },
  {
    title: 'Project Management',
    icon: 'projects-icon',
    path: PATHS.PROJECT,
    module: RoleModule.PROJECT_MANAGEMENT,
    secondaryNav: [
      { title: 'Company Dashboard', path: 'company-dashboard' },
      {
        title: 'Time sheet',
        path: 'timesheet',
        subNavs: [
          { title: 'Timer', path: 'timer' },
          { title: 'Dashboard', path: 'dashboard' },
          { title: 'Calendar', path: 'calendar' },
          { title: 'Results', path: 'results' },
        ],
        showSubNav: false,
      },
      { title: 'Logjam', path: 'logjam' },
    ],
  },
  // {
  //   title: 'Administrative',
  //   icon: 'approval-icon',
  //   path: PATHS.ADMIN,
  //   secondaryNav: [
  //     { title: 'Contracting', path: 'contracting' },
  //     { title: 'Files and Forms', path: 'files' },
  //   ],
  // },
  // {
  //   title: 'Chat',
  //   icon: 'chat-icon',
  //   path: PATHS.CHAT,
  // },
  // {
  //   title: 'Finance',
  //   icon: 'finance-icon',
  //   path: PATHS.FINANCE,
  // },
  {
    title: 'Settings',
    icon: 'settings-icon',
    path: PATHS.SETTINGS,
  },
];

export function getSubNavigation(path: string) {
  return nav.find((n) => n.path === path);
}
