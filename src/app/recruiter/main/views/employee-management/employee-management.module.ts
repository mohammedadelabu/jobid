import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeManagementComponent } from './employee-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeManagementRoutingModule } from './employee-management-routing.module';

@NgModule({
  declarations: [
    EmployeeManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeManagementRoutingModule
  ]
})
export class EmployeeManagementModule { }
