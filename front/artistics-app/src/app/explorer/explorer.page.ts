import { Component, OnInit } from '@angular/core';
import { FollowfunctionsService } from '../services/followfunctions.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.page.html',
  styleUrls: ['./explorer.page.scss'],
})
export class ExplorerPage implements OnInit {

  public postsArray = [];
  public usersId = [];
  public usersArray = [];
  public id: number;

  constructor( public followService: FollowfunctionsService) { }

  ngOnInit() {
    this.postList();
  }

  postList() {
    this.followService.listPost().subscribe((res) => {
      this.postsArray = res[0];
      console.log(this.postsArray);
    });
  }

  /*user( ) {

    this.id = this.usersId[0];
    this.followService.showUser(this.id).subscribe((res) => {
      this.usersArray = res[0];
      console.log(this.usersArray);
    });

  }*/

}
