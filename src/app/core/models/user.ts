export class User {
	id: number | string;
	username: string;
	address: string;
	phoneNumber: number;
	email: string;
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
