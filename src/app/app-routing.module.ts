import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagePaymentTypesComponent } from './manage-customers/manage-customers.component';
import { ManagePaymentTypeComponentCandeactivateGuard } from './core/guards/manage-customer-component-candeactivate.guard';
import { ItemsComponent } from './items/items.component';
import { ManageItemComponentCandeactivateGuardGuard } from './core/guards/manage-item-component-candeactivate-guard.guard';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { PlaceStockComponent } from './place-stock/place-stock.component';
import { AdjustStockComponent } from './adjust-stock/adjust-stock.component';
import { ReportComponent } from './report/report.component';
import { LoginComponent } from './login/login.component';

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
        path: '',
        //path: 'pos',
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
