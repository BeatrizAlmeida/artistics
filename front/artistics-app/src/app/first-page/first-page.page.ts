import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.page.html',
  styleUrls: ['./first-page.page.scss'],
})
export class FirstPagePage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 300,
    updateOnWindowResize: true,
  };

  constructor() { }

  ngOnInit() {
  }

}
