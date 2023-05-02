import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  {
    path: '',
    component:ChatComponent,
    children: [
      // { path: 'calendar', component: CalendarComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
