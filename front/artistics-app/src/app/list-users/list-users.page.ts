import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
})
export class ListUsersPage implements OnInit {

  public users: any = [];
  public user_id: number;
  constructor(public list:ListService) {  }

  ngOnInit() {
    this.listUser();
  }
 
  listUser(){
    this.list.listUser().subscribe ( (res) => {
      console.log (res);
      this.users = res[0];
      this.users = this.users.splice(1, this.users.length)
    });
  }
  
  saveId(user){
    localStorage.setItem('user_id',JSON.stringify(user.id));
    console.log(user.id)
     window.location.replace('/profile');  
  }

}
