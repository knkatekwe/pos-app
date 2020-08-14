import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaceOrderComponent } from 'src/app/place-order/place-order.component';
import { PlaceStockComponent } from 'src/app/inventory/place-stock/place-stock.component';

@Injectable()
export class PlaceStockComponentCandeactivateGuard implements CanDeactivate<PlaceStockComponent> {
	canDeactivate(
		component: PlaceStockComponent,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (component.frmItems.dirty) {
			return confirm('Are you sure you want to discard purchase?');
		}
		return true;
	}
}
