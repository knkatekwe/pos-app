import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaceOrderComponent } from 'src/app/place-order/place-order.component';

@Injectable()
export class PlaceOrderComponentCandeactivateGuard implements CanDeactivate<PlaceOrderComponent> {
	canDeactivate(
		component: PlaceOrderComponent,
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
