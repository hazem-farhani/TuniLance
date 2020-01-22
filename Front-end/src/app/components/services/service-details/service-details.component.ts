import { Component, OnInit } from '@angular/core';
import { Service } from '../../../models/service.model';
import { ServicesService } from '../../../services/services.service';
import { ActivatedRoute } from '@angular/router'
import { ProfileCardComponent } from '../../profile/profile-card/profile-card.component';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  private service:Service;
  private observable: any;
  private errorMessage = null;
  constructor(
    private servicesService: ServicesService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.observable = this.servicesService.getService(this.activatedRoute.snapshot.params['id'])
    .subscribe(service => {this.service = service; console.log(service)});
    this.servicesService.getServicePhoto(this.activatedRoute.snapshot.params['id']).subscribe(xd => console.log(xd))
    this.activatedRoute.params.subscribe(params => {
      params => {
        this.servicesService.getService(params['id'])
        .subscribe(
          service => {this.service = service; console.log(service)},
          err => {this.errorMessage="This service is NonExistant!" ;console.log(err);})
        this.servicesService.getServicePhoto(params['id']).subscribe(xd => console.log(xd))
      }
    })
  }
  //WHAT IF THE SERVICE CHANGED? UPDATE?
  ngOnDestroy() {
    this.observable.unsubscribe();
  }
}
