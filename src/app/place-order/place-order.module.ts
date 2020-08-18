import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceOrderRoutingModule } from './place-order-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PlaceOrderComponent } from './place-order.component';
import { OrderReceiptComponent } from './order-receipt/order-receipt.component';

@NgModule({
  declarations: [
    PlaceOrderComponent,
    OrderReceiptComponent
  ],
  imports: [
    SharedModule,
    PlaceOrderRoutingModule
  ],
  providers:[

  ]
})
export class PlaceOrderModule { }
