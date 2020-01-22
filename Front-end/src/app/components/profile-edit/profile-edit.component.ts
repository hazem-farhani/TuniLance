import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { User } from 'app/models/user.model';
import { AuthService } from 'app/services/auth.service';
import { Validators, FormBuilder, Form, FormGroup } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SkillService } from 'app/services/skill.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  currentUser:User;
  profileForm:FormGroup;
  skillForm:FormGroup;
  displayedColumns: string[] = ['id', 'name','actions'];
  dataSource ;
  imgURL=null;
  message;
  imagePath;
  isUploaded:any=false;
 constructor(private authService:AuthService,
             private _formBuilder:FormBuilder,
             private skillService:SkillService) { }
 
 ngOnInit() {
  this.profileForm = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    country: [''],
    phoneNumber: [''],
    dateOfBirth:[''],
    description:['']
     });
    this.skillForm=this._formBuilder.group({
      name:['',Validators.required]
    })

     this.authService.getCurrentUser()
         .subscribe(user=>{
             this.currentUser=user;
             this.reloadDataSource(this.currentUser.skills);
             this.imgURL=user.photo;
             this.profileForm.setValue({
                firstName:user.firstName,
                lastName:user.lastName,
                country:user.country,
                phoneNumber:user.phoneNumber,
                dateOfBirth:user.dateOfBirth,
                description:user.description
             });
         }); 
  }

  save(){
  
    var newUser=Object.assign({},this.profileForm.value,{id:this.currentUser.id},{photo:this.imgURL});
    console.log("hgggggggggggggggggggggggggggggggggg");
    console.log(newUser);
    this.authService.updateUser(newUser.id,newUser)
       .subscribe(user=>{
               this.authService.getCurrentUser()
                 .subscribe(user=>{
                  this.currentUser=user;
                  this.reloadDataSource(this.currentUser.skills);
                  this.imgURL=this.currentUser.photo;
                   this.profileForm.setValue({
                    firstName:user.firstName,
                    lastName:user.lastName,
                    country:user.country,
                    phoneNumber:user.phoneNumber,
                    dateOfBirth:user.dateOfBirth,
                    description:user.description
                   })
             })
       })
  }

  reloadDataSource(data) {
    this.dataSource = new MatTableDataSource(data);
  }

  isinvalidSkillForm(){
    return this.skillForm.invalid;
  }

  addSkill(){
    var newSkill=Object.assign({},this.skillForm.value,{userId:this.currentUser.id});
    this.skillService.create(newSkill)
        .subscribe(skill=>{
          this.skillService.getSkills()
            .subscribe(skills=>{
              this.reloadDataSource(skills);
            })
        })
  }
  
  deleteSkill(id:number){
    this.skillService.delete(id)
        .subscribe(ok=>{
          this.skillService.getSkills()
            .subscribe(skills=>{
              this.reloadDataSource(skills);
            })
        })
  }

  ngOnchange(changes: SimpleChanges){
    console.log("imgae url change");
    console.log(changes.imgURL.currentValue);
    this.imgURL=changes.imgURL.currentValue;
  }
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      this.isUploaded=true;
      console.log("immmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
      console.log(this.imgURL);
    }
  }
}
