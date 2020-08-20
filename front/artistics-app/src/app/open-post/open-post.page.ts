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
  public id:number = JSON.parse(localStorage.getItem('id'));
  public user:number = JSON.parse(localStorage.getItem('user_id'));

  constructor( public postService: CreatePostService,
                public authService: AuthServiceService) { }

  ngOnInit() {
    this.showPost(this.id);
    this.showUser(this.user)

  }

  showPost (id) {
    this.postService.showPost(id).subscribe((res) => {
      this.infosPost = res;
      console.log(this.infosPost);
    });
  }

  //FUNCAO QUE TÁ DANDO ERRO NO CORS
  showUser (user) {
    this.authService.showUser(user).subscribe((res) => {
      this.infosUser = res;
      console.log(this.infosUser);
    });
  }

}
