import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './_components/components.module';
import {HomeComponent} from './components/home/home.component';
import {SignupComponent} from './components/signup/signup.component';
import {ProfileComponent} from './components/profile/profile.component';
import {SigninComponent} from './components/signin/signin.component';
import {ServiceCardComponent} from './components/services/service-card/service-card.component';
import {CommonModule} from '@angular/common';
import {ServiceDetailsComponent} from './components/services/service-details/service-details.component';
import { SearchComponent } from './components/search/search.component';
import { ServiceAddComponent } from './components/services/service-add/service-add.component';
import { CommentListComponent } from './components/services/comment-list/comment-list.component';
import { CommentComponent } from './components/services/comment-list/comment/comment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule, MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ProfileCardComponent } from './components/profile/profile-card/profile-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,

    HomeComponent,
    SignupComponent,
    ProfileComponent,
    SigninComponent,
    ServiceCardComponent,
    ServiceDetailsComponent,
    SearchComponent,
    ServiceAddComponent,
    CommentListComponent,
    CommentComponent,
    ProfileCardComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    ComponentsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
	MatFormFieldModule,
	MatInputModule,
	MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
