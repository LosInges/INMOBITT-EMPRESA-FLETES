import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportesPageRoutingModule } from './transportes-routing.module';

import { TransportesPage } from './transportes.page';
import { AltaComponent } from './alta/alta.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportesPageRoutingModule
  ],
  declarations: [TransportesPage, AltaComponent]
})
export class TransportesPageModule {}
