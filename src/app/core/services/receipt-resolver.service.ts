import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderService } from './orders.service';

@Injectable()
export class CurrentReceiptResolver implements Resolve<any> {

constructor(private orderService: OrderService,
  private router: Router) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.orderService.getOrderDetail()
      .pipe(catchError((err) => this.router.navigateByUrl('/login')));
  }

}
