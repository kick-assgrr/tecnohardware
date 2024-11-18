import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BoletaComprasPageRoutingModule } from './boleta-compras-routing.module';
import { BoletaComprasPage } from './boleta-compras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletaComprasPageRoutingModule
  ],
  declarations: [BoletaComprasPage]
})
export class BoletaComprasPageModule {}