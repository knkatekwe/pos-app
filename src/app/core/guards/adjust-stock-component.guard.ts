import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaceOrderComponent } from 'src/app/place-order/place-order.component';
import { AdjustStockComponent } from 'src/app/inventory/adjust-stock/adjust-stock.component';
import { ConfirmationModalService } from 'src/app/shared/confirmation-modal/confirmation-modal.service';

@Injectable()
export class AdjustStockComponentCandeactivateGuard implements CanDeactivate<AdjustStockComponent> {
  constructor(private confirmationModalService: ConfirmationModalService) {}
	canDeactivate(
		component: AdjustStockComponent,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (component.FullTotal > 0) {
			//return confirm('Are you sure you want to discard purchase?');
			return this.confirmationModalService.confirm(
				'Removing from stock',
				'Are you sure you want to discard stock removal?',
        'Confirm',
        'Cancel'
			);
		}
		return true;
	}
}
