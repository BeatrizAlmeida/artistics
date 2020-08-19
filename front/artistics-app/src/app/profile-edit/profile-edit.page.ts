import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  editUserForm: FormGroup;
  image: SafeResourceUrl;

  constructor( public authService: AuthServiceService,
              public formbuilder: FormBuilder,
              public router: Router,
              private sanitizer: DomSanitizer,
              public toastController: ToastController) { this.editUserForm= this.formbuilder.group({
                image: [null],
                name: [null],
                phone: [null, [Validators.minLength(14), Validators.maxLength(15)]],
                biography: [null],               
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
      console.log(this.loggedUser);
    });
  }

  // CRIANDO A FUNCAO TIRAR FOTO
  async takePicture() {
    const photo = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      saveToGallery: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(photo && (photo.dataUrl));
    console.log(photo);

  }

  //MENSAGEM DE ERRO NA EDIÇAÕ
  async errorToast() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Erro ao atualizar informações!',
      duration: 4000
    });
    toast.present();
  }

  //MENSAGEM DE CONFIRMACAO DE EDIÇÃO
  async confirmToast() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Atualização de perfil feita com sucesso!',
      duration: 4000
    });
    toast.present();
  }

  //ENVIANDO INFORMACOES PARA O BD ATRAVES DO BOTAO SUBMIT
  submitForm(form) {
    console.log(form.value);
    this.authService.updateUser(form.value).subscribe(
      (res) => {
        console.log(res);
        this.confirmToast();
        this.router.navigate(['/profile'])
      },
      (err) => {
        console.log(err);
        this.errorToast();
      }
    );
  }

}
