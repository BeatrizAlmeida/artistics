import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  registerForm: FormGroup;
  

  constructor(public formbuilder: FormBuilder,
            public authService: AuthServiceService, public router: Router ) { 
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
  submitForm(form) {
    console.log("entrei");
    console.log(form);
    this.authService.login(form.value).subscribe(
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


