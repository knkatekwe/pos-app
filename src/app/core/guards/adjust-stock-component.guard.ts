import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaceOrderComponent } from 'src/app/place-order/place-order.component';
import { AdjustStockComponent } from 'src/app/inventory/adjust-stock/adjust-stock.component';

@Injectable()
export class AdjustStockComponentCandeactivateGuard implements CanDeactivate<AdjustStockComponent> {
	canDeactivate(
		component: AdjustStockComponent,
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
