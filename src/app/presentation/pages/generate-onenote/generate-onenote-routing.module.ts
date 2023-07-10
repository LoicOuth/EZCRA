import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateOnenoteComponent } from './generate-onenote.component';

const routes: Routes = [
  { path: '', component: GenerateOnenoteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateOnenoteRoutingModule { }
