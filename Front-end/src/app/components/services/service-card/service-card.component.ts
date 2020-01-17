import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../../models/service.model';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {
  @Input() private service = null;
  constructor(private router: Router) { }

  gotoDetails(){
    if (this.service)
     this.router.navigate(['/service',this.service.id])
  }
  ngOnInit() {
  }

}
