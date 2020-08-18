import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePaymentTypesComponent } from './manage-customers/manage-customers.component';
import { OrdersComponent } from './report/orders/orders.component';
import { StockComponent } from './report/stock/stock.component';
import { ProductsComponent } from './report/products/products.component';
import { ManagePaymentTypeComponentCandeactivateGuard } from '../core/guards/manage-customer-component-candeactivate.guard';
import { ReportComponent } from './report/report.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { RemovedComponent } from './report/removed/removed.component';


const routes: Routes = [
  {
    path: 'payment-types',
    component: ManagePaymentTypesComponent,
    canDeactivate: [ManagePaymentTypeComponentCandeactivateGuard]
  },
  {
    path: 'users',
    component: ManageUsersComponent,
    //canDeactivate: [ManagePaymentTypeComponentCandeactivateGuard]
  },
  {
    path: 'report',
    component: ReportComponent,
    children:[
      {
        path: 'sales',
        component: OrdersComponent
      },
      {
        path: 'stock',
        component: StockComponent
      },
      {
        path: 'removed',
        component: RemovedComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
