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
  }
//   {
//     path: '',
//     loadChildren: 'app/theme/theme.module#ThemeModule',
//     canActivate: [AuthGuard],
//   }
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