import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/models/user.model';
import { Router } from '@angular/router';
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;
    isSubmitted=false;
    authenticated=true;
    signinForm: FormGroup;
    constructor(private formBuilder: FormBuilder,
                private authService:AuthService,
                private router:Router ) { }

    ngOnInit() {
        this.signinForm  = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    login() {
        this.isSubmitted = true;
        this.authService.login(this.signinForm.value).subscribe(
          res => {
            this.authenticated=true;
            console.log('logged in');
            console.log(res.token);
            this.authService.setToken(res.token);
            this.authService.getCurrentUser()
              .subscribe(user => {
                console.log(user);
                this.authService.setCurrentUser(user);
                this.router.navigate(['/user-profile']);
              });
          },
          err => {
            this.authenticated=false;
            console.log("sorry you cannot login"+err.message+ 'not token');
          }
        );
        console.log(this.signinForm.value);
      }

      isFieldInvalid(field: string) { // {6}
      console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
      console.log(field);
      console.log(this.signinForm.get(field));
      console.log(this.signinForm.get(`${field}`));
      return  (!this.signinForm.get(field).valid && this.signinForm.get(`${field}`).touched);
       // (this.signinForm.get(field).untouched && this.isSubmitted)

    }

    isFormValid(): boolean {
      return( !this.isFieldInvalid('username') && !this.isFieldInvalid('password')
        && this.signinForm.get('username').valid && this.signinForm.get('password').valid);
    }
  

    
}
