import { Directive, OnInit, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Role } from '../core/models/user';
import { UserService } from '../core/services/user.service';

@Directive({ selector: '[appUserRole]'})
export class UserRoleDirective implements OnInit {
    constructor(
        private templateRef: TemplateRef<any>,
        private authService: AuthService,
        private viewContainer: ViewContainerRef,
        private userService: UserService,
    ) { }

    userRoles: Role[];

    @Input()
    set appUserRole(roles: Role[]) {
        if (!roles || !roles.length) {
            throw new Error('Roles value is empty or missed');
        }

        this.userRoles = roles;
    }

    ngOnInit() {
        let hasAccess = false;

        if (this.authService.isAuthenticated && this.userRoles) {
          console.log('...you are authenticated and roles has been passed...')
            hasAccess = this.userRoles.some(r => this.authService.hasRole(r));
        }

        if (hasAccess) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
