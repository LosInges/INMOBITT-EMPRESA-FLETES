import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FletesPageRoutingModule } from './fletes-routing.module';

import { FletesPage } from './fletes.page';
import { AltaComponent } from './alta/alta.component';
import { PrecargaComponent } from './precarga/precarga.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FletesPageRoutingModule,
  ],
  declarations: [FletesPage, AltaComponent, PrecargaComponent],
})
export class FletesPageModule {}
