import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from '../core/services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path: 'dashboard',
        loadChildren: () => import('./../dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'inventory',
        loadChildren: () => import('./../inventory/inventory.module').then((m) => m.InventoryModule)
      },
      {
        path: 'management',
        loadChildren: () => import('./../management/management.module').then((m) => m.ManagementModule)
      },
      {
        path: 'place-order',
        loadChildren: () => import('./../place-order/place-order.module').then((m) => m.PlaceOrderModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
