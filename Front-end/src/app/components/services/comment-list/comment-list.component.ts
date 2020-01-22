import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  private newComment=""
  @Input() private serviceId;
  @Input() comments : any;
  constructor(
	private commentService: CommentService,
	private authService: AuthService
  ) { }

  ngOnInit() {
  }

  addComment() {
	  const content = this.newComment;
	  this.newComment = "";
	  this.authService.getCurrentUser().subscribe(user => {
			  const comment = {
			  content: content,
			  userId: user.id,
			  serviceId: this.serviceId,
			  rating:4,
				}
			console.log(comment);
			this.commentService.addComment(comment).subscribe(comment => this.comments.push(comment));
		});

  }
}
