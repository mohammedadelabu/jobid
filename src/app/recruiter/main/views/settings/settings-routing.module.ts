import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { ApplicationModulesComponent } from './application-modules/application-modules.component';
import { ApplicationRoleDetailsComponent } from './application-roles/application-role-details/application-role-details.component';
import { ApplicationRolesComponent } from './application-roles/application-roles.component';
import { BranchLocationDetailsComponent } from './branches/branch-location-details/branch-location-details.component';
import { BranchLocationsComponent } from './branches/branch-locations/branch-locations.component';
import { BranchesComponent } from './branches/branches.component';
import { CreateBranchLocationComponent } from './branches/create-branch-location/create-branch-location.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ModulePermissionsComponent } from './roles-and-permission/module-permissions/module-permissions.component';
import { RolesAndPermissionComponent } from './roles-and-permission/roles-and-permission.component';
import { SettingsComponent } from './settings.component';
import { TwoStepVerificationComponent } from './two-step-verification/two-step-verification.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: '', component: AccountSettingsComponent },
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'modules', component: ApplicationModulesComponent },
      { path: 'roles', component: ApplicationRolesComponent },
      { path: 'roles/:roleId', component: ApplicationRoleDetailsComponent },

      {
        path: 'roles-and-permission',
        component: RolesAndPermissionComponent,
        children: [
          { path: '', component: ModulePermissionsComponent },
          { path: 'roles', component: ModulePermissionsComponent },
          { path: 'roles/:roleId', component: ModulePermissionsComponent },
          // { path: 'super-admin', component: SuperAdminPermissionComponent },
          // {
          //   path: 'recruitment-admin',
          //   component: RecruitmentAdminPermissionComponent,
          // },
          // {
          //   path: 'recruiter',
          //   component: RecruiterPermissionComponent,
          // },
          // {
          //   path: 'client',
          //   component: ClientPermissionComponent,
          // },
          // {
          //   path: 'client-admin',
          //   component: ClientAdminPermissionComponent,
          // },
          // {
          //   path: 'partners',
          //   component: PartnersPermissionComponent,
          // },
          // {
          //   path: 'sales',
          //   component: SalesPermissionComponent,
          // },
          // {
          //   path: 'sales-admin',
          //   component: SalesAdminPermissionComponent,
          // },
        ],
      },
      { path: 'administrators', component: AdministratorsComponent },
      {
        path: 'branches',
        component: BranchesComponent,
        children: [
          { path: '', component: BranchLocationsComponent },
          { path: 'create-branch', component: CreateBranchLocationComponent },
          {
            path: 'details/:branchId',
            component: BranchLocationDetailsComponent,
          },
        ],
      },
      { path: 'users', component: UsersComponent },

      { path: '2-step-verification', component: TwoStepVerificationComponent },
      { path: 'recovery', component: RecoveryComponent },
    ],
  },
  // {path: '', component: }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
