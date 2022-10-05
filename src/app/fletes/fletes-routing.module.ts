import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaComponent } from './alta/alta.component';

import { FletesPage } from './fletes.page';
import { PaqueteComponent } from './paquetes/paquete/paquete.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { PrecargaComponent } from './precarga/precarga.component';

const routes: Routes = [
  {
    path: '',
    component: FletesPage,
  },
  {
    path: 'alta',
    component: AltaComponent,
  },
  {
    path: 'precarga',
    component: PrecargaComponent,
  },
  {
    path: 'paquetes',
    component: PaquetesComponent,
    children: [
      {
        path: ':id/items',
        component: PaqueteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FletesPageRoutingModule {}
