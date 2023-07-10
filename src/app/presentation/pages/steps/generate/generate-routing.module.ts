import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateComponent } from './generate.component';

const routes: Routes = [
  {
    path: '',
    component: GenerateComponent,
    children: [
      { path: 'onenote', loadChildren: () => import('../../generate-onenote/generate-onenote.module').then(m => m.GenerateOnenoteModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateRoutingModule { }
