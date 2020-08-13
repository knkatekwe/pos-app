import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceOrderComponent } from './place-order.component';


const routes: Routes = [
  {
    path: '',
    component: PlaceOrderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaceOrderRoutingModule { }
