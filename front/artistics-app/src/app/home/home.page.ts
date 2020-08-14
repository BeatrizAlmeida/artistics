import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  registerForm: FormGroup;

  constructor(public formbuilder: FormBuilder) {

    this.registerForm = this.formbuilder.group({
      music: [null],
      paint: [null],
      photography: [null],
      draw: [null]
    })
  }

  ngOnInit() {  }

  submitForm(form) {
    console.log(form);
    console.log(form.value);
  }
  
};
