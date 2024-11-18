import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacasMadrePageRoutingModule } from './placas-madre-routing.module';

import { PlacasMadrePage } from './placas-madre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlacasMadrePageRoutingModule
  ],
  declarations: [PlacasMadrePage]
})
export class PlacasMadrePageModule {}
