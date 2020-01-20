import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/Category.model';
import { map, catchError } from 'rxjs/operators';

const API_URL = "http://localhost:5000/categories"

@Injectable({
  providedIn:'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient){}

  /*public getCategory(id:number): Observable<Category>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Category>(API_URL+"/"+id).pipe(
      map(data => new Category(data.id, data.title, data.description, data.price, data.rating))
    );
  }*/

  public getCategories(): Observable<Category[]>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Category[]>(API_URL+"/list").pipe(
      map(data => data.map(category => new Category(category.id, category.name)))
    );
  }

/*  public getTopCategory(): Observable<Category[]>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get<Category[]>(API_URL+"/top3").pipe(
      map(data => {
        console.log(data[0])
        return data.map(Category => new Category(Category.id, Category.title, Category.description, Category.price, Category.rating))
      }
      ));
  }*/
}
