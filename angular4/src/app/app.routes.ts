import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { ModuleWithProviders } from '@angular/core';


export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  // {
  //   path: '',
  //   component: DashboardComponent
  // },
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    // canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: 'app/common/common.module#CommonModule',
  }
  // {
  //   path: '**',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes), HttpModule ],
  exports: [ RouterModule, HttpModule ]
})
export class AppRoutingModule { }
