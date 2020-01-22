import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
	@Input() comment:any;
	user: any;
  constructor(
	private authService: AuthService
	) { }

  ngOnInit() {
	this.authService.getUser(this.comments.userId).subscribe(user => console.log(user));
  }

}
