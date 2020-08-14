import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth-guard.service';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
	{
		path: 'login',
		loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard],
  },

	{ path: '', pathMatch: 'full', redirectTo: 'main/dashboard' }
  //{path: 'pos', pathMatch: 'full', redirectTo: '/main/dashboard'}
  ,{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [ RouterModule.forRoot(appRoutes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
