import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaceStockComponent } from 'src/app/inventory/place-stock/place-stock.component';
import { ConfirmationModalService } from 'src/app/shared/confirmation-modal/confirmation-modal.service';

@Injectable()
export class PlaceStockComponentCandeactivateGuard implements CanDeactivate<PlaceStockComponent> {
  constructor(private confirmationModalService: ConfirmationModalService) {}
	canDeactivate(
		component: PlaceStockComponent,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (component.FullTotal > 0) {
      //return confirm('Are you sure you want to discard purchase?');
      return this.confirmationModalService.confirm(
				'Stock In-take',
				'Are you sure you want to discard stock in-take?',
        'Confirm',
        'Cancel'
			);
		}
		return true;
	}
}
