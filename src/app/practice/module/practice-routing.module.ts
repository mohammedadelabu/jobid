import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularReduxComponent } from '../angular-redux/angular-redux.component';
import { DdApiSampleObjectSortingComponent } from '../drag-and-drop/dd-api-sample-object-sorting/dd-api-sample-object-sorting.component';
import { DdConnectedObjectSortingComponent } from '../drag-and-drop/dd-connected-object-sorting/dd-connected-object-sorting.component';
import { DdConnectedSortingComponent } from '../drag-and-drop/dd-connected-sorting/dd-connected-sorting.component';
import { DdObjectSortingComponent } from '../drag-and-drop/dd-object-sorting/dd-object-sorting.component';
import { DdSortingComponent } from '../drag-and-drop/dd-sorting/dd-sorting.component';
import { DragAndDropComponent } from '../drag-and-drop/drag-and-drop.component';
import { DynamicFormsComponent } from '../dynamic-forms/dynamic-forms.component';
import { HomeComponent } from '../home/home.component';
import { PracticeComponent } from '../practice.component';
import { SocialSharingComponent } from '../social-sharing/social-sharing.component';

const routes: Routes = [
  {
    path: '',
    component: PracticeComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'dynamic-forms', component: DynamicFormsComponent },
      { path: 'social-sharing', component: SocialSharingComponent },
      { path: 'angular-redux', component: AngularReduxComponent },
      {
        path: 'drag-and-drop',
        component: DragAndDropComponent,
        children: [
          { path: '', component: DdSortingComponent },
          { path: 'sorting', component: DdSortingComponent },
          { path: 'connected-sorting', component: DdConnectedSortingComponent },
          { path: 'object-sorting', component: DdObjectSortingComponent },
          { path: 'object-connected-sorting', component: DdConnectedObjectSortingComponent },
          { path: 'api-sample-object-sorting', component: DdApiSampleObjectSortingComponent },
        ],
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticeRoutingModule {}
