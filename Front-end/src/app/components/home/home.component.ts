import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service.model';
import { ServicesService } from '../../services/services.service';

@Component({
    selector: 'app-landing',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  focus: any;
  focus1: any;
  private topServices = null;
  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.servicesService.getTopServices().subscribe(
      services => {
        console.log(services);
        this.topServices = services;
      }
    )
  }

}
