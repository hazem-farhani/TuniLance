import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from '../models/service.model';
import { map, catchError } from 'rxjs/operators';

const API_URL = "http://localhost:5000/comments"

@Injectable({
  providedIn:'root'
})
export class CommentService {
  constructor(private httpClient: HttpClient){}

  public addComment(comment: any){
    //const headers = new HttpHeaders({'Content-Type': 'form-data'});
    return this.httpClient.post(API_URL+"/add", comment);/*.pipe(
      map(data => new Service(data.id, data.title, data.description, data.price, data.rating))
    );*/
  }
}
