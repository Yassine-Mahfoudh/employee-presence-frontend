import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  myVar : any = [];

  constructor(private service:PostsService) { }

  ngOnInit() {
    this.getPostsNow()  }
    
getPostsNow(){
  this.service.getPosts()
  .subscribe(res => {
    this.myVar=res;
  });
}
}