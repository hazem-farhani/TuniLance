import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service.model';
import { ActivatedRoute } from '@angular/router'
import { ServicesService} from '../../services/services.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private page = 1;
  private keyword = "";
  private services = []

  constructor(
    private route:ActivatedRoute,
    private servicesService: ServicesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.keyword = params["keyword"])
    this.servicesService.getServicesByTitle(this.keyword).subscribe(
      services => this.services = services
    )
  }

  

}
