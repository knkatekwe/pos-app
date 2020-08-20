import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ManagePaymentTypesComponent } from 'src/app/management/manage-customers/manage-customers.component';
import { ConfirmationModalService } from 'src/app/shared/confirmation-modal/confirmation-modal.service';

@Injectable()
export class ManagePaymentTypeComponentCandeactivateGuard implements CanDeactivate<ManagePaymentTypesComponent> {
  constructor(private confirmationModalService: ConfirmationModalService) {}
	canDeactivate(
		component: ManagePaymentTypesComponent,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (component.frmPaymentTypes.dirty) {
      //return confirm('Are you sure you want to discard your changes?');
      return this.confirmationModalService.confirm(
				'Payment Types',
				'Are you sure you want to leave payment types?',
        'Confirm',
        'Cancel'
			);
		}
		return true;
	}
}
