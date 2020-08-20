import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaceOrderComponent } from 'src/app/place-order/place-order.component';
import { ConfirmationModalService } from 'src/app/shared/confirmation-modal/confirmation-modal.service';

@Injectable()
export class PlaceOrderComponentCandeactivateGuard implements CanDeactivate<PlaceOrderComponent> {
  constructor(private confirmationModalService: ConfirmationModalService) {}
	canDeactivate(
		component: PlaceOrderComponent,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (component.FullTotal > 0) {
      //return confirm('Are you sure you want to discard purchase?');
      return this.confirmationModalService.confirm(
				'Sale',
				'Are you sure you want to discard sale?',
        'Confirm',
        'Cancel'
			);
		}
		return true;
	}
}
