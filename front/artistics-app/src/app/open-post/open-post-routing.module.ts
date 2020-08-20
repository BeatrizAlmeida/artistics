import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenPostPage } from './open-post.page';

const routes: Routes = [
  {
    path: '',
    component: OpenPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenPostPageRoutingModule {}
