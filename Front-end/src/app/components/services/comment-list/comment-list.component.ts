import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  private newComment=""
  @Input() comments : any;
  constructor(
	private authService: AuthService,
  ) { }

  ngOnInit() {
	  this.authService.getUser(this.comments[0].userId).subscribe(user => console.log(user));
  }

  addComment() {
    console.log(this.newComment)
  }
}
