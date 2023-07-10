import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  { path: '', loadChildren: () => import('./presentation/pages/home/home.module').then(m => m.HomeModule), canActivate: [MsalGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
