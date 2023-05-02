import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloWorldSampleComponent } from './hello-world-sample.component';

const routes: Routes = [
  {
    path: '',
    component: HelloWorldSampleComponent,
    children: [
      // { path: 'calendar', component: CalendarComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelloWorldSamplRoutingModule {}
