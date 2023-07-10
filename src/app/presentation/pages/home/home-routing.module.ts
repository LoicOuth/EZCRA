import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreventDirectNavigationGuardGuard } from 'src/app/core/guards/PreventDirectNavigationGuard/prevent-direct-navigation-guard.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'steps/information', pathMatch: 'full' },
      { path: 'steps/information', loadChildren: () => import('../../../presentation/pages/steps/information/information.module').then(m => m.InformationModule) },
      { path: 'steps/preview', loadChildren: () => import('../../../presentation/pages/steps/preview/preview.module').then(m => m.PreviewModule), canActivate: [PreventDirectNavigationGuardGuard] },
      { path: 'steps/generate', loadChildren: () => import('../../../presentation/pages/steps/generate/generate.module').then(m => m.GenerateModule), canActivate: [PreventDirectNavigationGuardGuard] }

    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
