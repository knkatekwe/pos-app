import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ManagePaymentTypesComponent } from './views/manage-customers/manage-customers.component';
import {RouterModule, Routes} from '@angular/router';
import {PaymentTypeService} from './services/payment-type.service';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ManagePaymentTypeComponentCandeactivateGuard} from './guards/manage-customer-component-candeactivate.guard';
import {LoginComponent } from './views/login/login.component';
import {MainComponent } from './views/main/main.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './guards/auth.guard';
import {AuthService} from './services/auth.service';
import {ItemsComponent} from './views/items/items.component';
import {ItemService} from './services/item.service';
import {OrderService} from './services/orders.service';
import {StockService} from './services/stock.service';
import { PlaceOrderComponent } from './views/place-order/place-order.component';
import { PlaceStockComponent } from './views/place-stock/place-stock.component';
import {ManageItemComponentCandeactivateGuardGuard} from './guards/manage-item-component-candeactivate-guard.guard';
import {PlaceOrder} from './dtos/place-order';
import {PlaceOrderServiceService} from './services/place-order-service.service';
import {PlaceStockServiceService} from './services/place-stock-service.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import { SalesComponent } from './views/report/sales/sales.component';
import { ProductsComponent } from './views/report/products/products.component';
import { OrdersComponent } from './views/report/orders/orders.component';
import { StockComponent } from './views/report/stock/stock.component';
import { ReportComponent } from './views/report/report.component';
import { AdjustStockComponent } from './views/adjust-stock/adjust-stock.component';
import { PlaceAdjustmentServiceService } from './services/place-adjustment.service';
import { AdjustmentService } from './services/adjustment.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ManagePaymentTypesComponent,
    LoginComponent,
    MainComponent,
    ItemsComponent,
    PlaceOrderComponent,
    PlaceStockComponent,
    SalesComponent,
    ProductsComponent,
    OrdersComponent,
    StockComponent,
    ReportComponent,
    AdjustStockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    NgbModule,
    DataTablesModule
  ],
  providers: [
    PaymentTypeService,
    ItemService,
    OrderService,
    StockService,
    AdjustmentService,
    PlaceOrderServiceService,
    PlaceStockServiceService,
    PlaceAdjustmentServiceService,
    ManagePaymentTypeComponentCandeactivateGuard,
    ManageItemComponentCandeactivateGuardGuard,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
