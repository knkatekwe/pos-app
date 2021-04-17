import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdjustStockComponent } from './adjust-stock/adjust-stock.component';
import { ItemsComponent } from './items/items.component';
import { PlaceStockComponent } from './place-stock/place-stock.component';
import { ManageItemComponentCandeactivateGuardGuard } from '../core/guards/manage-item-component-candeactivate-guard.guard';
import { AdjustStockComponentCandeactivateGuard } from '../core/guards/adjust-stock-component.guard';
import { PlaceStockComponentCandeactivateGuard } from '../core/guards/place-stock-component.guard';
import { InventoryComponent } from './inventory.component';
import { BarcodesComponent } from './barcodes/barcodes.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children:[
      {
        path: 'adjust-stock',
        component: AdjustStockComponent,
        //canDeactivate: [AdjustStockComponentCandeactivateGuard]
      },
      {
        path: 'barcodes',
        component: BarcodesComponent,
        // canDeactivate: [ManageItemComponentCandeactivateGuardGuard]
      },
      {
        path: 'products',
        component: ItemsComponent,
        canDeactivate: [ManageItemComponentCandeactivateGuardGuard]
      },
      {
        path: 'place-stock',
        component: PlaceStockComponent,
        //canDeactivate: [PlaceStockComponentCandeactivateGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
