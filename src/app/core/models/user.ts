export class User {
	id: number | string;
	username: string;
	password: string;
	authorities: [
		{
			authority: string;
		}
	];
	enabled: boolean;
	accountNonLocked: boolean;
	credentialsNonExpired: boolean;
	accountNonExpired: boolean;
}

export class UserObject {
	token: string;
	user: User;
}

export enum Role {
  User = 'ROLE_USER',
  Admin = 'ROLE_ADMIN'
}
