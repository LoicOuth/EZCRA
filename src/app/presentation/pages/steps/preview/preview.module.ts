import { NgModule } from '@angular/core';

import { PreviewRoutingModule } from './preview-routing.module';
import { PreviewComponent } from './preview.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PreviewComponent],
  imports: [
    SharedModule,
    PreviewRoutingModule
  ]
})
export class PreviewModule { }
