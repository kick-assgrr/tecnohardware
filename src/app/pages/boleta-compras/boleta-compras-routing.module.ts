import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoletaComprasPage } from './boleta-compras.page';

const routes: Routes = [
  {
    path: '',
    component: BoletaComprasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletaComprasPageRoutingModule {}