import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  registerForm: FormGroup;
  

  constructor(public formbuilder: FormBuilder ) { 
    this.registerForm = this.formbuilder.group({
      email: [null, Validators.required, Validators.email],
      password: [null,Validators.required, Validators.maxLength(20), Validators.minLength(8)]      
    });
  }

  ngOnInit() {
  }

  submitForm(form) {
    console.log(form);
    console.log(form.value);
  }

}
