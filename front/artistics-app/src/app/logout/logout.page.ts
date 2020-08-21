import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public alertController: AlertController,
              public authService: AuthServiceService,
              public router: Router,) { }

  ngOnInit() {

    this.alerta();
  }

  //CRIANDO O ALERTA PARA LOGOUT
  async alerta() {
    const alert = await this.alertController.create({
      subHeader: 'Sair',
      message: 'Deseja sair do Artistics?',
      buttons: [
        {
          text: 'SIM',
          handler: () => {
            console.log('Saindo...');
            this.desLog();
            this.router.navigate(['/login']);
          }
        },
        {
          text: 'NÃO',
          handler: () => {
            console.log('Ficando...');
            this.router.navigate(['/home']);
          }
        }
      ]
    })
    alert.present();
  }

  //CRIANDO FUNCAO PARA DESLOGAR
  desLog() {
    this.authService.logout().subscribe(
      (res) => {
        console.log(res.Sucess);
        localStorage.removeItem('userToken');
        this.router.navigate(['/login'])
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
