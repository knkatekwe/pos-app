import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive, Component } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import { HttpTokenInterceptor } from './core/interceptors';
import { ApiService } from './core/services/api.service';
import { JwtService } from './core/services/jwt.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagePaymentTypesComponent } from './manage-customers/manage-customers.component';
import { MainComponent } from './main/main.component';
import { ItemsComponent } from './items/items.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { PlaceStockComponent } from './place-stock/place-stock.component';
import { SalesComponent } from './reports/sales/sales.component';
import { ProductsComponent } from './reports/products/products.component';
import { OrdersComponent } from './reports/orders/orders.component';
import { StockComponent } from './reports/stock/stock.component';
import { ReportComponent } from './report/report.component';
import { AdjustStockComponent } from './adjust-stock/adjust-stock.component';
import { AppRoutingModule } from './app-routing.module';
import { PaymentTypeService } from './core/services/payment-type.service';
import { ItemService } from './core/services/item.service';
import { OrderService } from './core/services/orders.service';
import { StockService } from './core/services/stock.service';
import { AdjustmentService } from './core/services/adjustment.service';
import { PlaceOrderServiceService } from './core/services/place-order-service.service';
import { PlaceStockServiceService } from './core/services/place-stock-service.service';
import { PlaceAdjustmentServiceService } from './core/services/place-adjustment.service';
import { ManagePaymentTypeComponentCandeactivateGuard } from './core/guards/manage-customer-component-candeactivate.guard';
import { ManageItemComponentCandeactivateGuardGuard } from './core/guards/manage-item-component-candeactivate-guard.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';
import { LoginComponent } from './login/login.component';

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
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
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
    AuthService,
    ApiService,
    UserService,
    AuthGuard,
    JwtService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
