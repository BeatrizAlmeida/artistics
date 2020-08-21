import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router:Router,
              public toastController: ToastController){

  }

  async errorToast() {
    const toast = await this.toastController.create({
      position: 'top',
      message: 'Para acessar é necessário estar logado!',
      duration: 3000
    });
    toast.present();
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('userToken') ) {
      return true;
    }
    else{
      this.errorToast();
      return this.router.navigate(['/login'])
    }

  }

  
}
