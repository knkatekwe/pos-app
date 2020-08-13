import { NgModule } from '@angular/core';

import { InventoryRoutingModule } from './inventory-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ItemsComponent } from './items/items.component';
import { AdjustStockComponent } from './adjust-stock/adjust-stock.component';
import { PlaceStockComponent } from './place-stock/place-stock.component';

@NgModule({
  declarations: [
    ItemsComponent,
    AdjustStockComponent,
    PlaceStockComponent
  ],
  imports: [
    SharedModule,
    InventoryRoutingModule
  ],
  providers:[
  ]
})
export class InventoryModule { }
