import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticeRoutingModule } from './practice-routing.module';
import { CrmComponentsComponent } from './crm-components/crm-components.component';


@NgModule({
  declarations: [
    CrmComponentsComponent
  ],
  imports: [
    CommonModule,
    PracticeRoutingModule
  ]
})
export class PracticeModule { }
