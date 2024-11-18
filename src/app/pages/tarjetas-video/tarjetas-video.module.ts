import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarjetasVideoPageRoutingModule } from './tarjetas-video-routing.module';

import { TarjetasVideoPage } from './tarjetas-video.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarjetasVideoPageRoutingModule
  ],
  declarations: [TarjetasVideoPage]
})
export class TarjetasVideoPageModule {}
