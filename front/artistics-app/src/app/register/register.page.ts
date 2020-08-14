import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthServiceService } from '../services/auth-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  image: SafeResourceUrl;

  constructor(public authService: AuthServiceService,
              public formbuilder: FormBuilder,
              public router: Router,
              private sanitizer: DomSanitizer) {

    //CRIANDO E VALIDANDO ATRIBUTOS DO FORMULARIO
    this.registerForm = this.formbuilder.group({
      image: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phone: [null, [Validators.minLength(14), Validators.maxLength(15)]],
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
    const photo = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      saveToGallery: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(photo && (photo.dataUrl));

  }

  submitForm(form) {
    console.log(form.value);
    form.value.moderator = 0;
    this.authService.register(form.value).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.Success.token);
        this.router.navigate(['/home'])
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
