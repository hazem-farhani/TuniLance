import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {Router} from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';
import { Category } from '../../models/category.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    private keyword = "";
    private categories = []
	private user;

    constructor(
      private router: Router,
      public location: Location,
      private element : ElementRef,
      private categoryService: CategoryService,
      private authService: AuthService,
    ) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    }

    search(){
      if (this.keyword.length)
        this.router.navigate(['/search', this.keyword])
    }
    
    navbarFixed() {
      return this.router.url != '/home';
    }

    getUser(){
      this.authService.getCurrentUser().subscribe(user => this.user = user)
    }

    removeHeader_Footer() {
        return this.router.url === '/signin' || this.router.url === '/signup';
    }

	logout(){
		this.authService.logout();
		this.router.navigate(['/signin']);
	}
}
