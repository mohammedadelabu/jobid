import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesAndPermissionRoutingModule } from './roles-and-permission-routing.module';
import { FormsModule } from '@angular/forms';
import { ModulePermissionsComponent } from './module-permissions/module-permissions.component';


@NgModule({
  declarations: [
    ModulePermissionsComponent,
  ],
  imports: [
    CommonModule,
    RolesAndPermissionRoutingModule,FormsModule
  ],
  exports:[ModulePermissionsComponent]
})
export class RolesAndPermissionModule { }
