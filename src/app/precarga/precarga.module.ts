import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrecargaPageRoutingModule } from './precarga-routing.module';

import { PrecargaPage } from './precarga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrecargaPageRoutingModule
  ],
  declarations: [PrecargaPage]
})
export class PrecargaPageModule {}
