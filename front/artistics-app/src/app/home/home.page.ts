import { Component, OnInit, Input } from '@angular/core';

import { CreatePostService } from '../services/create-post.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor( public postService: CreatePostService,
              public router: Router,) { }

  public postsArray = [];

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

  ngOnInit() {
    this.postList();
  }


}
