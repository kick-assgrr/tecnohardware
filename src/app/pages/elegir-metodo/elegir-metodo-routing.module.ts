import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElegirMetodoPage } from './elegir-metodo.page';

const routes: Routes = [
  {
    path: '',
    component: ElegirMetodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElegirMetodoPageRoutingModule {}
