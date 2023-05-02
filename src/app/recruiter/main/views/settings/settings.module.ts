import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UpdatePersonalInformationComponent } from './account-settings/update-personal-information/update-personal-information.component';
import { AddSecondaryEmailAddressComponent } from './account-settings/add-secondary-email-address/add-secondary-email-address.component';
import { ResetPasswordComponent } from './account-settings/reset-password/reset-password.component';
import { SettingsSideNavigationComponent } from './components/settings-side-navigation/settings-side-navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesAndPermissionComponent } from './roles-and-permission/roles-and-permission.component';
import { CreateAdminRoleDialogComponent } from './components/create-admin-role-dialog/create-admin-role-dialog.component';
import { RolesAndPermissionModule } from './roles-and-permission/roles-and-permission.module';
import { ApplicationModulesComponent } from './application-modules/application-modules.component';
import { RegisterModuleFormComponent } from './application-modules/register-module-form/register-module-form.component';
import { EditModuleFormComponent } from './application-modules/edit-module-form/edit-module-form.component';
import { BranchesComponent } from './branches/branches.component';
import { UsersComponent } from './users/users.component';
import { ApplicationRolesComponent } from './application-roles/application-roles.component';
import { TwoStepVerificationComponent } from './two-step-verification/two-step-verification.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApplicationRoleDetailsComponent } from './application-roles/application-role-details/application-role-details.component';
import { CreateBranchLocationComponent } from './branches/create-branch-location/create-branch-location.component';
import { BranchLocationsComponent } from './branches/branch-locations/branch-locations.component';
import { VerifyEmailCodeComponent } from './account-settings/verify-email-code/verify-email-code.component';
import { BranchLocationDetailsComponent } from './branches/branch-location-details/branch-location-details.component';
import { NotificationComponent } from './notification/notification.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    SettingsComponent,
    AdministratorsComponent,
    AccountSettingsComponent,
    UpdatePersonalInformationComponent,
    AddSecondaryEmailAddressComponent,
    ResetPasswordComponent,
    SettingsSideNavigationComponent,
    RolesAndPermissionComponent,
    CreateAdminRoleDialogComponent,
    ApplicationModulesComponent,
    RegisterModuleFormComponent,
    EditModuleFormComponent,
    BranchesComponent,
    UsersComponent,
    ApplicationRolesComponent,
    TwoStepVerificationComponent,
    RecoveryComponent,
    ApplicationRoleDetailsComponent,
    CreateBranchLocationComponent,
    BranchLocationsComponent,
    VerifyEmailCodeComponent,
    BranchLocationDetailsComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RolesAndPermissionModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class SettingsModule {}
