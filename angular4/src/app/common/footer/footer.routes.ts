import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FooterComponent } from './footer.component';
const routes: Routes = [
  {
    path: '',
    component: FooterComponent,
    data: { title: 'Footer' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FooterRoutes { }
