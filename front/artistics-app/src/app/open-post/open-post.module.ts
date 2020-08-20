import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenPostPageRoutingModule } from './open-post-routing.module';

import { OpenPostPage } from './open-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenPostPageRoutingModule
  ],
  declarations: [OpenPostPage]
})
export class OpenPostPageModule {}
