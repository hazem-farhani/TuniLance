import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { passwordValidator } from '../../validators/password.validator';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
	accountDetailFormGroup: FormGroup;
	personalDetailFormGroup: FormGroup;
	thirdFormGroup: FormGroup;
	isSubmitted=false;
	checked=false;
	constructor(private _formBuilder: FormBuilder,
				private authService:AuthService,
				private router:Router) { }

    ngOnInit() {
		this.accountDetailFormGroup = this._formBuilder.group({
			username: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]],
			passConfirm: ['', Validators.required],
			email: ['', Validators.required],
		}, {validator: passwordValidator});
		this.personalDetailFormGroup = this._formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			country: [''],
			phoneNumber: [''],
			dateOfBirth:[''],
       freelancer:[false]
		});
	}

	register() {
		var user=Object.assign({}, this.accountDetailFormGroup.value, this.personalDetailFormGroup.value);
        this.isSubmitted = true;
        this.authService.register(user).subscribe(
          res => {
            console.log('registred ');
            console.log(res.token);
            this.authService.setToken(res.token);
            this.authService.getCurrentUser()
              .subscribe(user => {
                console.log(user);
                this.authService.setCurrentUser(user);
                this.router.navigate(['/user-profile',user.id]);
              });
          },
          err => {
            console.log("sorry you cannot register"+err.message);
          }
        );
        console.log(user);
      }



}
