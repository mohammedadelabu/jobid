import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWorldSamplRoutingModule } from './hello-world-sample-routing.module';
import { HelloWorldSampleComponent } from './hello-world-sample.component';

@NgModule({
  declarations: [HelloWorldSampleComponent],
  imports: [CommonModule, HelloWorldSamplRoutingModule],
})
export class HelloWorldSampleModule {}
