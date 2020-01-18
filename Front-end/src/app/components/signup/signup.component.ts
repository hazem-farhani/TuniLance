import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { passwordValidator } from '../../validators/password.validator';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	thirdFormGroup: FormGroup;
    focus;
    focus1;
    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit() {
		this.firstFormGroup = this._formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
			passConfirm: ['', Validators.required],
			email: ['', Validators.required],
		}, {validator: passwordValidator});
		this.secondFormGroup = this._formBuilder.group({
			secondCtrl: ['', Validators.required]
		});
		this.thirdFormGroup = this._formBuilder.group({
			thirdCtrl: ['', Validators.required]
		});
	}
}
