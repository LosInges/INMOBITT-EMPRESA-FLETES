import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrecargaPage } from './precarga.page';

const routes: Routes = [
  {
    path: '',
    component: PrecargaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrecargaPageRoutingModule {}
