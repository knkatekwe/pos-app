import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceOrderRoutingModule } from './place-order-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PlaceOrderComponent } from './place-order.component';

@NgModule({
  declarations: [
    PlaceOrderComponent
  ],
  imports: [
    SharedModule,
    PlaceOrderRoutingModule
  ],
  providers:[

  ]
})
export class PlaceOrderModule { }
