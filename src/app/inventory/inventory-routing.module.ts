import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdjustStockComponent } from './adjust-stock/adjust-stock.component';
import { ItemsComponent } from './items/items.component';
import { PlaceStockComponent } from './place-stock/place-stock.component';
import { ManageItemComponentCandeactivateGuardGuard } from '../core/guards/manage-item-component-candeactivate-guard.guard';


const routes: Routes = [
  {
    path: 'adjust-stock',
    component: AdjustStockComponent
  },
  {
    path: 'products',
    component: ItemsComponent,
    //canDeactivate: [ManageItemComponentCandeactivateGuardGuard]
  },
  {
    path: 'place-stock',
    component: PlaceStockComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
