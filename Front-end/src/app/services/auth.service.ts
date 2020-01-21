import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {User} from '../models/user.model';


@Injectable({
  providedIn:'root'
})

export class AuthService {



  constructor(private http: HttpClient){}

   API_URL = "http://localhost:5000/users";



  login(user: User): Observable<any> {
    const authRequest = {
      email : user.email,
      password: user.password
    };
    return this.http.post<any>(`${this.API_URL}/login`, authRequest);
  }

  register(user: User): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${this.API_URL}/register`, user);
  }



  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !! this.getToken();
  }

 setToken(token) {
     localStorage.setItem('token', token);
  }

  getCurrentUser(): any {
    //return this.http.get<any>(`${this.API_URL}/me`);
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  setCurrentUser(user) {// save it in localstorage
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      JSON.parse(localStorage.getItem('currentUser'));
    } else {
      localStorage.setItem('currentUser', null);
      JSON.parse(localStorage.getItem('currentUser'));
    }
  }



}
