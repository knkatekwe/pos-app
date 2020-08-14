import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceOrderComponent } from './place-order.component';
import { PlaceOrderComponentCandeactivateGuard } from '../core/guards/place-order-component-guard.guard';


const routes: Routes = [
  {
    path: '',
    component: PlaceOrderComponent,
    canDeactivate: [PlaceOrderComponentCandeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaceOrderRoutingModule { }
