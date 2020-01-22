import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/models/user.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
     currentUser:User;
     visitedUser:User;
     userId:any;
     marray=['1','2','3','5'];
     isTheSameUser=false;
     imgURL=null;
    constructor(private authService:AuthService,
                private activatedRoute:ActivatedRoute,
                private router:Router) { }
    
    ngOnInit() {
            this.activatedRoute.paramMap.subscribe((params: ParamMap) =>  {
                this.userId = params.get('userId');
                this.authService.getUser(this.userId)
                    .subscribe(user=>{
                          this.visitedUser=user;
                          this.imgURL=this.visitedUser.photo;
                          this.authService.getCurrentUser()
                          .subscribe(user=>{
                              this.currentUser=user;
                              if(this.currentUser.id===this.visitedUser.id)this.isTheSameUser=true;
                          });
                    })
            });
    }
    
    edit(id:number){
        this.router.navigate(['/user-profile-edit',id]);
    }
    
}
