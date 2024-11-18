import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcesadoresPage } from './procesadores.page';

const routes: Routes = [
  {
    path: '',
    component: ProcesadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcesadoresPageRoutingModule {}
