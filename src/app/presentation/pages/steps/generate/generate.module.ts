import { NgModule } from '@angular/core';

import { GenerateRoutingModule } from './generate-routing.module';
import { GenerateComponent } from './generate.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [GenerateComponent],
  imports: [
    GenerateRoutingModule,
    SharedModule
  ]
})
export class GenerateModule { }
