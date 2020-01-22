import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  private newComment=""
  @Input() comments : any;
  constructor(
  ) { }

  ngOnInit() {
  }

  addComment() {
    console.log(this.newComment)
  }
}
