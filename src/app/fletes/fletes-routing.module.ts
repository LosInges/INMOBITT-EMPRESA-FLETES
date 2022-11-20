import { RouterModule, Routes } from '@angular/router';

import { DetallePaqueteComponent } from './paquetes/detalle-paquete/detalle-paquete.component';
import { FletesPage } from './fletes.page';
import { NgModule } from '@angular/core';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { PrecargaComponent } from './precargas/precarga/precarga.component';
import { PrecargasComponent } from './precargas/precargas.component';

const routes: Routes = [
  {
    path: '',
    component: FletesPage,
  },
  {
    path: 'precargas',
    component: PrecargasComponent,
  },
  {
    path: 'precarga',
    component: PrecargaComponent,
  },
  {
    path: 'precargas/alta',
    component: PrecargaComponent,
  },
  {
    path: 'precarga/:id',
    component: PrecargaComponent,
  },
  {
    path: ':id/paquetes',
    component: PaquetesComponent,
  },
  {
    path: ':flete/paquetes/:id/items',
    component: DetallePaqueteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FletesPageRoutingModule {}
