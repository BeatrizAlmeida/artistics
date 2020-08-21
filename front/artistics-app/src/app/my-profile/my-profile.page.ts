import { Component, OnInit } from '@angular/core';

import { AuthServiceService } from '../services/auth-service.service';

import { FollowfunctionsService } from '../services/followfunctions.service';

import { ListService } from '../services/list.service';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  public loggedUser = [];
  public loggedUserId: number;
  public user_id :number = JSON.parse(localStorage.getItem('user_id'));
  public user: any = {name: "loading...", biography: "loading..."};
  public followers: number;
  public following: number;
  public check: boolean;

  constructor( public authService: AuthServiceService,
              public followService: FollowfunctionsService,
              public list:ListService) { }

  ngOnInit() {
    this.getLoggedUser();
    this.numberFollowers(this.user_id);
    this.numberFollowing(this.user_id);
    this.checkFollowing(this.user_id);
  }

  public getLoggedUser() {
    this.authService.profile().subscribe((res) => {
      console.log(res);
      this.loggedUser = res.Success;     
    });
  }

  public numberFollowers(loggedUserId) {
    this.followService.numberFollowers(loggedUserId).subscribe((res) => {
      console.log(res);
      this.followers = res;
    });
  }
  public numberFollowing(loggedUserId) {
    this.followService.numberFollowing(loggedUserId).subscribe((res) => {
      console.log(res);
      this.following = res;
    });
  }

  public checkFollowing(user_id) {
    this.followService.checkFollowing(user_id).subscribe((res) => {
      console.log(res);
      this.check = res;
    });
  }

  public follow(user){
    this.followService.follow(user.id).subscribe((res) => {
      console.log(res);
      this.check = true;
      this.followers = this.followers + 1;
    });
  }

  public unfollow(user){
    this.followService.unfollow(user.id).subscribe((res) => {
      console.log(res);
      this.check = false;
      this.followers = this.followers - 1;
    });
  }

}
