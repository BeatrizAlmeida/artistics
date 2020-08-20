import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FollowfunctionsService } from '../services/followfunctions.service';
import { Router } from '@angular/router';
import { CreatePostService } from '../services/create-post.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.page.html',
  styleUrls: ['./explorer.page.scss'],
})
export class ExplorerPage implements OnInit {

  public postsArray = [];

  constructor( public postService: CreatePostService,
              public router: Router,) { }

  ngOnInit() {
    this.postList();
  }

  postList() {
    this.postService.listPost().subscribe((res) => {
      this.postsArray = res[0];
      console.log(this.postsArray);
    });
  }

  clickPost(post) {
    localStorage.setItem('id',JSON.stringify(post.id));
    localStorage.setItem('user_id',JSON.stringify(post.user_id));
    console.log(post.id)
    console.log(post.user_id)
    this.router.navigate(['/open-post'])
  }

}
