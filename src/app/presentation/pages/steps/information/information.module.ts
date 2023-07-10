import { NgModule } from '@angular/core';

import { InformationRoutingModule } from './information-routing.module';
import { InformationComponent } from './information.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InformationComponent
  ],
  imports: [
    InformationRoutingModule,
    SharedModule
  ]
})
export class InformationModule { }
