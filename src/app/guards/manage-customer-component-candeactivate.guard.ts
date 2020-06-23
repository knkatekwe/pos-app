import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs';
import {ManagePaymentTypesComponent} from '../views/manage-customers/manage-customers.component';

@Injectable()
export class ManagePaymentTypeComponentCandeactivateGuard implements CanDeactivate<ManagePaymentTypesComponent> {

  canDeactivate(component: ManagePaymentTypesComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (component.frmPaymentTypes.dirty) {
      return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }

}
