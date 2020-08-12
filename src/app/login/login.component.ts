import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { timer } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
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
	) // private alertService: AlertService
	{
	}

	ngOnInit() {
		this.failed = false;
		this.form = this.formBuilder.group({
			username: [ '', Validators.required ],
			password: [ '', Validators.required ],
		});

		// get return url from route parameters or default to '/'
		// this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	// convenience getter for easy access to form fields
	get email() {
		return this.form.get('email');
	}

	get password() {
		return this.form.get('password');
	}

	login() {
		//this.isSubmitting = true;
		//this.errors = {errors: {}};

		const credentials = this.form.value;
		console.log(credentials);
		this.userService.login(credentials).subscribe(
			(data) => {
				console.log('login successful!');
				this.router.navigateByUrl('/main/dashboard');
			},
			(err) => {
				console.log(err);
				//this.errors = err;
				this.isSubmitting = false;
        this.failed = true;
        timer(500)
        this.failed = false
			}
		);
	}
}
