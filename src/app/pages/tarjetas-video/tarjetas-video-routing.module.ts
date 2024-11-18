import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarjetasVideoPage } from './tarjetas-video.page';

const routes: Routes = [
  {
    path: '',
    component: TarjetasVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarjetasVideoPageRoutingModule {}
