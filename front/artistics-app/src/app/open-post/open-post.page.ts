import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CreatePostService } from '../services/create-post.service';

import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-open-post',
  templateUrl: './open-post.page.html',
  styleUrls: ['./open-post.page.scss'],
})
export class OpenPostPage implements OnInit {

  public infosPost = [];
  public infosUser = [];
  public comments = [];
  public id:number = JSON.parse(localStorage.getItem('id'));
  public user:number = JSON.parse(localStorage.getItem('user_id'));

  constructor( public postService: CreatePostService,
                public authService: AuthServiceService) { }

  ngOnInit() {
    this.showPost(this.id);
    this.showUser(this.user);
    this.commentInPost(this.id);
  }

  showPost (id) {
    this.postService.showPost(id).subscribe((res) => {
      this.infosPost = res;
      console.log(this.infosPost);
    });
  }

  showUser (user) {
    this.authService.showUser(user).subscribe((res) => {
      this.infosUser = res;
      console.log(this.infosUser);
    });
  }

  commentInPost (id) {
    this.postService.commentInPost(id).subscribe((res) => {
      this.comments = res;
      this.ownerComment();
    });
  }

  ownerComment(){
    for (let i=0; i<this.comments.length; i++){
      let user_id = this.comments[i].user_id;
      this.authService.showUser(user_id).subscribe((res) => {
        this.comments[i].user_name = res.name;
        this.comments[i].image = res.image;
      });
    }
  }
}
