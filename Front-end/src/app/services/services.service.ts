import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../models/service.model';
import { map, catchError } from 'rxjs/operators';

const API_URL = "http://localhost:5000/services"

@Injectable({
  providedIn:'root'
})
export class ServicesService {
  constructor(private httpClient: HttpClient){}

  public getService(id:number): Observable<Service>{
    //const s = new Service("English male voice over","eazdsq qqqqqqq qqqqazdq sdcazedazeazeazeazrqsdqsdazedaz",5);
    //return new Observable<Service>( (o) => o.next(s))
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Service>(API_URL+"/"+id).pipe(
      map(data => new Service(data.id, data.title, data.description, data.price, data.rating))
    );
  }

  public getServicePhoto(id:number): any{
    //const s = new Service("English male voice over","eazdsq qqqqqqq qqqqazdq sdcazedazeazeazeazrqsdqsdazedaz",5);
    //return new Observable<Service>( (o) => o.next(s))
    //const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get(API_URL+"/photo/"+id)/*.pipe(
      map(data => new Service(data.id, data.title, data.description, data.price, data.rating))
    );*/
  }

  public getServicesByTitle(title: String): Observable<Service[]>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Service[]>(API_URL+"/title/"+title).pipe(
      map(data => {
        console.log(data[0])
        return data.map(service => new Service(service.id, service.title, service.description, service.price, service.rating))
      }
      ));
  }

  public getTopServices(): Observable<Service[]>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Service[]>(API_URL+"/top3").pipe(
      map(data => {
        console.log(data[0])
        return data.map(service => new Service(service.id, service.title, service.description, service.price, service.rating))
      }
      ));
  }

  public addService(formData){
    const headers = new HttpHeaders({'Content-Type': 'form-data'});
    return this.httpClient.post(API_URL, formData)/*.pipe(
      map(data => new Service(data.id, data.title, data.description, data.price, data.rating))
    );*/
  }
}
