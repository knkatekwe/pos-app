import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { take, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService,
              public router: Router) {}

	canActivate(): boolean {
		if (!this.auth.isAuthenticated()) {
			this.router.navigate([ '/login' ]);
			return false;
		}
		return true;
  }

}
