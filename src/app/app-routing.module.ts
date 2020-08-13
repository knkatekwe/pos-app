import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
	{
		path: 'login',
		loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
	},
	{
		path: 'dashboard',
		loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
	},
	{
		path: 'inventory',
		loadChildren: () => import('./inventory/inventory.module').then((m) => m.InventoryModule)
	},
	{
		path: 'management',
		loadChildren: () => import('./management/management.module').then((m) => m.ManagementModule)
	},
	{
		path: 'place-order',
		loadChildren: () => import('./place-order/place-order.module').then((m) => m.PlaceOrderModule)
	},
	{ path: '', pathMatch: 'full', redirectTo: '/dashboard' }
	//{path: 'pos', pathMatch: 'full', redirectTo: '/main/dashboard'}
];

@NgModule({
	imports: [ RouterModule.forRoot(appRoutes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
