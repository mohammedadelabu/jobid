import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePlacementComponent } from './create-placement/create-placement.component';
import { PlacementDetailsComponent } from './placement-details/placement-details.component';
import { PlacementListComponent } from './placement-list/placement-list.component';
import { PlacementComponent } from './placement.component';

const routes: Routes = [
  {
    path: '',
    component: PlacementComponent,
    children: [
      { path: '', component: PlacementListComponent },
      { path: 'placement-list', component: PlacementListComponent },
      { path: 'placement-details/:id', component: PlacementDetailsComponent },
      { path: 'create-placement', component: CreatePlacementComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacementRoutingModule {}
