import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AltaComponent } from './alta/alta.component';
import { Cargador } from '../fletes/interfaces/cargador';
import { CargadoresService } from '../fletes/services/cargadores.service';
import { DetalleComponent } from './detalle/detalle.component';
import { ModalController } from '@ionic/angular';
import { SessionService } from '../services/session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cargadores',
  templateUrl: './cargadores.page.html',
  styleUrls: ['./cargadores.page.scss'],
})
export class CargadoresPage implements OnInit, OnDestroy {
  eventosRouter: any;
  cargadores: Cargador[] = [];
  empresa: string
  api = environment.api;
  constructor(
    private router: Router,
    private cargadoresService: CargadoresService,
    private modalController: ModalController,
    private sessionService: SessionService
  ) {
    this.eventosRouter = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }


  ngOnInit() {
    this.sessionService.get('empresa')?.then(empresa => {
      this.empresa = empresa
      this.cargadoresService
        .getCargadores(empresa)
        .subscribe((cargadores) => {
          this.cargadores = cargadores;
        });
    })
  }

  ngOnDestroy(): void {
    if (this.eventosRouter) {
      this.eventosRouter.unsubscribe();
    }
  }

  async abrirRegistro() {
    const modal = await this.modalController.create({
      component: AltaComponent,
      componentProps: { empresa: this.empresa },
      cssClass: 'modalGeneral'
    });
    modal.onDidDismiss().then(val => {
      if (val.data) this.cargadores.push(val.data)
      else console.log(val)
    })
    return await modal.present();
  }

  async detalleCargador(rfc: string) {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        cargador: this.cargadores.filter((cargador) => cargador.rfc === rfc)[0],
      },
      cssClass: 'modalGeneral'
    });
    modal.onDidDismiss().then(val => {
      if (val.data.actualizado)
        this.cargadores.filter((cargador) => cargador.rfc === rfc)[0] = val.data.cargador
    })
    return await modal.present();
  }

  eliminar(cargador: Cargador) {
    this.cargadoresService.deleteCargador(cargador).subscribe((valor) => {
      this.cargadores = valor.results
        ? this.cargadores.filter((c) => c != cargador)
        : this.cargadores;
    });
  }
}
