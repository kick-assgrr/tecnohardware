import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcesadoresPageRoutingModule } from './procesadores-routing.module';

import { ProcesadoresPage } from './procesadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcesadoresPageRoutingModule
  ],
  declarations: [ProcesadoresPage]
})
export class ProcesadoresPageModule {}
