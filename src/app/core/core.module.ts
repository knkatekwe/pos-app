import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentTypeService } from './services/payment-type.service';
import { ItemService } from './services/item.service';
import { OrderService } from './services/orders.service';
import { StockService } from './services/stock.service';
import { AdjustmentService } from './services/adjustment.service';
import { PlaceOrderServiceService } from './services/place-order-service.service';
import { PlaceStockServiceService } from './services/place-stock-service.service';
import { PlaceAdjustmentServiceService } from './services/place-adjustment.service';
import { ManagePaymentTypeComponentCandeactivateGuard } from './guards/manage-customer-component-candeactivate.guard';
import { ManageItemComponentCandeactivateGuardGuard } from './guards/manage-item-component-candeactivate-guard.guard';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { JwtService } from './services/jwt.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule
  ],
  providers:[
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
    CookieService,
  ]
})
export class CoreModule { }
