import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {ManagePaymentTypesComponent} from './views/manage-customers/manage-customers.component';
import {ManagePaymentTypeComponentCandeactivateGuard} from './guards/manage-customer-component-candeactivate.guard';
import {MainComponent} from './views/main/main.component';
import {LoginComponent} from './views/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {ItemsComponent} from './views/items/items.component';
import {ManageItemComponentCandeactivateGuardGuard} from './guards/manage-item-component-candeactivate-guard.guard';
import {PlaceOrderComponent} from './views/place-order/place-order.component';
import {PlaceStockComponent} from './views/place-stock/place-stock.component';
import {ReportComponent} from './views/report/report.component';
import { AdjustStockComponent } from './views/adjust-stock/adjust-stock.component';

const appRoutes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {
        path: 'manage-payments',
        component: ManagePaymentTypesComponent,
        canDeactivate: [ManagePaymentTypeComponentCandeactivateGuard]
      },
      {
        path: 'manage-products',
        component: ItemsComponent,
        canDeactivate: [ManageItemComponentCandeactivateGuardGuard]
      },
      {
        path: 'place-order',
        component: PlaceOrderComponent
      },
      {
        path: 'place-stock',
        component: PlaceStockComponent
      },
      {
        path: 'adjust-stock',
        component: AdjustStockComponent
      },
      {
        path: 'view-report',
        component: ReportComponent
      },

      {
        // path: '',
        path: 'pos',
        pathMatch : 'full',
        redirectTo: '/main/dashboard'
      }
    ]
  },
  {path: 'login', component: LoginComponent},
  // {path: '', pathMatch: 'full', redirectTo: '/main/dashboard'}
  {path: 'pos', pathMatch: 'full', redirectTo: '/main/dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
