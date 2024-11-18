import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElegirMetodoPageRoutingModule } from './elegir-metodo-routing.module';

import { ElegirMetodoPage } from './elegir-metodo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElegirMetodoPageRoutingModule
  ],
  declarations: [ElegirMetodoPage]
})
export class ElegirMetodoPageModule {}
