import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/Category.model';
import { map, catchError } from 'rxjs/operators';
import { Skill } from 'app/models/skill.model';



@Injectable({
  providedIn:'root'
})
export class SkillService {
  constructor(private http: HttpClient){}
  API_URL = "http://localhost:5000/skills"

  create(skill:Skill):Observable<Skill>{
        return this.http.post<Skill>(`${this.API_URL}/add`,skill);
  }

  delete(skillId:number):Observable<any>{
    return this.http.delete<Skill>(`${this.API_URL}/delete/${skillId}`);
  }

  getSkills():Observable<Skill[]>{
      return this.http.get<Skill[]>(`${this.API_URL}/list`);
  }
}
