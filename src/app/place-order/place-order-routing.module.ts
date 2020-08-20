import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceOrderComponent } from './place-order.component';
import { PlaceOrderComponentCandeactivateGuard } from '../core/guards/place-order-component-guard.guard';
import { OrderReceiptComponent } from './order-receipt/order-receipt.component';
import { CurrentReceiptResolver } from '../core/services/receipt-resolver.service';
import { ReceiptPrintComponent } from '../shared/receipts/receipt-print/receipt-print.component';


const routes: Routes = [
  {
    path: '',
    component: PlaceOrderComponent,
    //canDeactivate: [PlaceOrderComponentCandeactivateGuard]
  },
  {
    path: 'receipt',
    component: OrderReceiptComponent
  },
  {
    path: 'receipt/print',
    component: ReceiptPrintComponent,
    resolve:{
      order: CurrentReceiptResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaceOrderRoutingModule { }
