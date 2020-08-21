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
  }

  public getLoggedUser() {
    this.authService.profile().subscribe((res) => {
      console.log(res);
      this.loggedUser = res.Success;     
      this.loggedUserId = res.Success.id;
      this.numberFollowers(this.loggedUserId);
      this.numberFollowing(this.loggedUserId);
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

}
