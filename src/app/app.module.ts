import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { InventoryModule } from './inventory/inventory.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { ManagementModule } from './management/management.module';
import { PlaceOrderModule } from './place-order/place-order.module';
import { CoreModule } from './core/core.module';
import { MainModule } from './main/main.module';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    MainModule,
    InventoryModule,
    DashboardModule,
    AuthModule,
    ManagementModule,
    PlaceOrderModule,
    NgxPrintModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
