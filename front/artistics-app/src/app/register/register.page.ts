import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  photo: SafeResourceUrl;

  constructor(public authService: AuthServiceService,
              public formbuilder: FormBuilder,
              public router: Router,
              private sanitizer: DomSanitizer,
              public toastController: ToastController) {

    //CRIANDO E VALIDANDO ATRIBUTOS DO FORMULARIO
    this.registerForm = this.formbuilder.group({
      image: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phone: [null, [Validators.minLength(14), Validators.maxLength(15)]],
      biography: [null],
      password: [null, [Validators.required, Validators.minLength(8),Validators.maxLength(15)]],
      password_confirmation: [null, [Validators.required]]
    }, {validator: this.matchingPasswords('password', 'password_confirmation')});
  }

  ngOnInit() {  }

  //CRIANDO FUNCAO PARA COMBINAR AS SENHAS
  matchingPasswords(passwordKey: string, password_confirmationKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let password_confirmation = group.controls[password_confirmationKey];

      if (password.value !== password_confirmation.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  // CRIANDO A FUNCAO TIRAR FOTO
  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      saveToGallery: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    console.log(image);

  }

  //MENSAGEM DE ERRO NO CADASTRO
  async errorToast() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Email já cadastrado!',
      duration: 4000
    });
    toast.present();
  }
  //MENSAGEM DE CONFIRMACAO DE CADASTRO
  async confirmToast() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Cadastro feito com sucesso!',
      duration: 4000
    });
    toast.present();
  }

  //ENVIANDO INFORMACOES PARA O BD ATRAVES DO BOTAO SUBMIT
  submitForm(form) {
    console.log(form.value);
    form.value.moderator = 0;
    if(this.photo){
        form.value.image = this.photo['changingThisBreaksApplicationSecurity'];
      }
    this.authService.register(form.value).subscribe(
      (res) => {
        console.log(res);
        this.confirmToast();
        localStorage.setItem('userToken', res.Success.token);
        this.router.navigate(['/login'])
      },
      (err) => {
        console.log(err);
        this.errorToast();
      }
    );
  }


}
