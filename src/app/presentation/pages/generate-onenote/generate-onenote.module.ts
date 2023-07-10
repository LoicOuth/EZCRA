import { NgModule } from '@angular/core';

import { GenerateOnenoteRoutingModule } from './generate-onenote-routing.module';
import { GenerateOnenoteComponent } from './generate-onenote.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [GenerateOnenoteComponent],
  imports: [
    GenerateOnenoteRoutingModule,
    SharedModule
  ]
})
export class GenerateOnenoteModule { }
