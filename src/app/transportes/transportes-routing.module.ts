import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaComponent } from './alta/alta.component';

import { TransportesPage } from './transportes.page';

const routes: Routes = [
  {
    path: '',
    component: TransportesPage
  },
  {
    path: 'alta',
    component: AltaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportesPageRoutingModule {}
