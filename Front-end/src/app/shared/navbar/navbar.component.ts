import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    private keyword = "";

    constructor(private router: Router, public location: Location, private element : ElementRef) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }

    search(){
      if (this.keyword.length)
        this.router.navigate(['/search', this.keyword])
    }
    navbarFixed() {
      return this.router.url != '/home';
    }

    removeHeader_Footer() {
        return this.router.url === '/signin' || this.router.url === '/signup';
    }
}
