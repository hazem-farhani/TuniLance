import {Service} from './service.model';
import {Skill} from './skill.model';
export class User {
    constructor(){}
    public id: number;
    public username: String;
    public email: String;
    public freelancer:number;
    public password: string;
    public firstName: string;
    public lastName:string;
    public country:string;
    public dateOfBirth:string;
    public phoneNumber:string;
    public photo:string;
    public services:Array<Service>;
    public skills:Array<Skill>;
    public description:string;
  }
  