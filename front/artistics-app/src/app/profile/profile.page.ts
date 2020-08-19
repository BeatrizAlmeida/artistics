import { Component, OnInit } from '@angular/core';

import { AuthServiceService } from '../services/auth-service.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor( public authService: AuthServiceService) { }

  public loggedUser = [];

  ngOnInit() {
    this.getLoggedUser();
  }

  public getLoggedUser() {
    this.authService.profile().subscribe((res) => {
      console.log(res);
      this.loggedUser = res.Success;
      console.log(this.loggedUser);
    });
  }
}
