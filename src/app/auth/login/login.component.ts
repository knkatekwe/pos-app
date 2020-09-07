import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	form: FormGroup;
	loading = false;
	submitted = false;
	//errors: Errors = { errors: {} };
	isSubmitting = false;
	failed: boolean;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService
	) {
		this.userService.purgeAuth();
	}

	ngOnInit() {
    this.failed = false;
    this.isSubmitting = false
		this.form = this.formBuilder.group({
			username: [ '', Validators.required ],
			password: [ '', Validators.required ]
		});

		// this.router.navigateByUrl('pos', { skipLocationChange: true }).then(() => {
		// 	this.router.navigate([ '/login' ]);
		// });
	}

	// convenience getter for easy access to form fields
	get email() {
		return this.form.get('email');
	}

	get password() {
		return this.form.get('password');
	}

	login() {
		this.isSubmitting = true;
		//this.errors = {errors: {}};
		const credentials = this.form.value;
		//console.log(credentials);
		this.userService.login(credentials).subscribe(
			(data) => {
				//console.log('login successful!');
				this.isSubmitting = false;
				this.router.navigateByUrl('/main/dashboard');
			},
			(err) => {
				console.log(err);
				//this.errors = err;
				this.isSubmitting = false;
				//alert('Failed to login...!' + err);
				this.failed = true;
				setTimeout(() => {
					//<<<---using ()=> syntax
					this.failed = false;
				}, 5000);
			}
		);
	}
}
