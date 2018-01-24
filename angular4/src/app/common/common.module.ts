import { NgModule } from '@angular/core';
import { CommonRoutes } from './common.routes';

import { CommonComponent } from './common.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonService } from './common.service';


@NgModule({
  imports: [
    CommonRoutes
  ],
  providers: [CommonService],
  declarations: [CommonComponent, HeaderComponent, FooterComponent]
})
export class CommonModule { }
