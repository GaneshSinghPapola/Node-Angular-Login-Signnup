import { NgModule } from '@angular/core';
import { DashboardRoutes } from './dashboard.routes';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';

@NgModule({
  imports: [
    DashboardRoutes
  ],
  providers: [DashboardService],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
