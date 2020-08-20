import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthServiceService } from '../services/auth-service.service';
import { CreatePostService } from '../services/create-post.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  createPostForm: FormGroup;
  photo: SafeResourceUrl;
  user_id: number;


  constructor( public authService: AuthServiceService,
    public createPostService: CreatePostService,
    public formbuilder: FormBuilder,
    public router: Router,
    private sanitizer: DomSanitizer,
    public toastController: ToastController) { 
      this.createPostForm=this.formbuilder.group({
        category:[null,[Validators.required]],
        title:[null,[Validators.required]],
        text:[null],
        image:[null],
        // audio:[null],//
      });
    }

    async takePicture() {
      const image = await Plugins.Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        saveToGallery: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  
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
    if(this.photo) {
      form.value.image = this.photo['changingThisBreaksApplicationSecurity'];
    }
    console.log(form.value);
    this.createPostService.createPost(form.value).subscribe((res) => {
      console.log('post criado');
      form.reset();
    } );
  }

}