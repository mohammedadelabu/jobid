import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacementRoutingModule } from './placement-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PlacementComponent } from './placement.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProjectsComponent } from './projects/projects.component';
import { PlacementListComponent } from './placement-list/placement-list.component';
import { GridComponent } from './placement-list/grid/grid.component';
import { ListComponent } from './placement-list/list/list.component';
import { PlacementDetailsComponent } from './placement-details/placement-details.component';
import { SetTriggerComponent } from './placement-details/set-trigger/set-trigger.component';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePlacementComponent } from './create-placement/create-placement.component';
import { PlacedApplicantsListComponent } from './placement-list/placed-applicants-list/placed-applicants-list.component';
import { PlacementCardComponent } from './placement-list/grid/placement-card/placement-card.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    PlacementComponent,
    EmployeesComponent,
    ProjectsComponent,
    PlacementListComponent,
    GridComponent,
    ListComponent,
    PlacementDetailsComponent,
    SetTriggerComponent,
    CreatePlacementComponent,
    PlacedApplicantsListComponent,
    PlacementCardComponent
    
  ],
  imports: [
    CommonModule,
    PlacementRoutingModule,
    MatTabsModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PlacementModule { }
