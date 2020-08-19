import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthServiceService } from '../services/auth-service.service';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public registerForm: FormGroup;
  

  constructor(public formbuilder: FormBuilder,
            public authService: AuthServiceService,
            public router: Router,
            public toastController: ToastController ) { 

    this.registerForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(8)]]      
    });
  }

  ngOnInit() {
  }

  printForm(form){
    console.log(form.value);
  }

  //MENSAGEM DE ERRO NO LOGIN
  async errorToast() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Email ou senha inválidos!',
      duration: 3000
    });
    toast.present();
  }
  
  //MENSAGEM DE CONFIRMACAO DE LOGIN 
  async confirmToast() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Bem-vinde ao Artistics!',
      duration: 3000
    });
    toast.present();
  }

  submitForm(form) {
    console.log(form);
    this.authService.login(form.value).subscribe(
      (res) => {
        console.log(res);
        this.confirmToast();
        localStorage.setItem('userToken', res.Success.token) 
        this.router.navigate(['/home'])
      },
      (err) => {
        console.log(err);
        this.errorToast();
      }
    );
  }
}


