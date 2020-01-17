import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/service.model';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private service = new Service(5,"aez","aea",5,5);
  private page = 1;
  private keyword = "";

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.keyword = params["keyword"])
  }

}
