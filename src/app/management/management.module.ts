import { NgModule } from '@angular/core';

import { ManagementRoutingModule } from './management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManagePaymentTypesComponent } from './manage-customers/manage-customers.component';
import { OrdersComponent } from './report/orders/orders.component';
import { ProductsComponent } from './report/products/products.component';
import { StockComponent } from './report/stock/stock.component';
import { ReportComponent } from './report/report.component';
import { StockService } from '../core/services/stock.service';
import { ManageUsersComponent } from './manage-users/manage-users.component';

@NgModule({
  declarations: [
    ManagePaymentTypesComponent,
    OrdersComponent,
    ProductsComponent,
    StockComponent,
    ReportComponent,
    ManageUsersComponent,
  ],
  imports: [
    SharedModule,
    ManagementRoutingModule
  ],
  providers:[

  ]
})
export class ManagementModule { }
