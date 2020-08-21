import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthServiceService } from '../services/auth-service.service';
import { CommentsService } from '../services/comments.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  CommentsForm: FormGroup;

  user_id: number;

  public post_id :number = JSON.parse(localStorage.getItem('id'));


  constructor( public authService: AuthServiceService,
    public CommentsService: CommentsService,
    public formbuilder: FormBuilder,
    public router: Router,
    private sanitizer: DomSanitizer,
    public toastController: ToastController) { 
      this.CommentsForm=this.formbuilder.group({
        text:[null,[Validators.required]],
      });
    }
 public loggedUser = [];

  ngOnInit() {
    this.getLoggedUser();
  }

  public getLoggedUser() {
    this.authService.profile().subscribe((res) => {
      console.log(res);
      this.loggedUser = res.Success;
      this.user_id = res.Success.id;
      console.log(this.loggedUser);
    });
  }

  submitForm( form ) {
    console.log(form.value);
    form.value.user_id = this.user_id;
    console.log(this.user_id);
    console.log(form.value);
    form.value.post_id= this.post_id;
    this.CommentsService.createComment(form.value).subscribe((res) => {
      console.log('Comentário Postado');
      form.reset();
    } );
  }

}
