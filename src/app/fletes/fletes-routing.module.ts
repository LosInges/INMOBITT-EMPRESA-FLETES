import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaComponent } from './alta/alta.component';

import { FletesPage } from './fletes.page';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FletesPageRoutingModule {}
