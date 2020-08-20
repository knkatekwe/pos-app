import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemsComponent } from 'src/app/inventory/items/items.component';
import { ConfirmationModalService } from 'src/app/shared/confirmation-modal/confirmation-modal.service';

@Injectable()
export class ManageItemComponentCandeactivateGuardGuard implements CanDeactivate<ItemsComponent> {
  constructor(private confirmationModalService: ConfirmationModalService) {}
	canDeactivate(
		component: ItemsComponent,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (component.frmItems.dirty) {
      //return confirm('Are you sure you want to discard your changes?');
      return this.confirmationModalService.confirm(
				'Products',
				'Are you sure you want to leave products?',
        'Confirm',
        'Cancel'
			);
		}
		return true;
	}
}
