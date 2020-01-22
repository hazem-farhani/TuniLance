import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './_components/components.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NucleoiconsComponent } from './_components/nucleoicons/nucleoicons.component';
import {SigninComponent} from './components/signin/signin.component';
import {ServiceDetailsComponent} from './components/services/service-details/service-details.component';
import {SearchComponent} from './components/search/search.component';
import { ServiceAddComponent } from './components/services/service-add/service-add.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home2', component: ComponentsComponent },
    { path: 'user-profile/:userId', component: ProfileComponent },
    { path: 'user-profile-edit/:userId', component: ProfileEditComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'home', component: HomeComponent },
    { path: 'nucleoicons', component: NucleoiconsComponent },
    { path: 'service/add', component: ServiceAddComponent },
    { path: 'service/:id', component: ServiceDetailsComponent },
    { path: 'search/:keyword', component: SearchComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
