import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../../components/header/header.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent],
  imports: [
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
