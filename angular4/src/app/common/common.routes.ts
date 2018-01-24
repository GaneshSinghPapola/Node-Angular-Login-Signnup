import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonComponent } from './common.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    data: { title: 'Dashboard' },
    children: [
      {
        path: '',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'dashboard',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CommonRoutes { }
