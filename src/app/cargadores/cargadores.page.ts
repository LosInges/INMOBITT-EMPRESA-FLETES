import { ModalController } from '@ionic/angular';
import { AltaComponent } from './alta/alta.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Cargador } from '../fletes/interfaces/cargador';
import { CargadoresService } from '../fletes/services/cargadores.service';

@Component({
  selector: 'app-cargadores',
  templateUrl: './cargadores.page.html',
  styleUrls: ['./cargadores.page.scss'],
})
export class CargadoresPage implements OnInit, OnDestroy {
  eventosRouter: any;
  cargadores: Cargador[] = [];

  constructor(
    private router: Router,
    private cargadoresService: CargadoresService,
    private modalController: ModalController
  ) {
    this.eventosRouter = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.cargadoresService
      .getCargadores('empresa@mail.com')
      .subscribe((cargadores) => {
        this.cargadores = cargadores;
      });
  }
  

  ngOnDestroy(): void {
    if (this.eventosRouter) {
      this.eventosRouter.unsubscribe();
    }
  }

  async abrirRegistro(){
    const modal = await this.modalController.create({
      component: AltaComponent,

    });

    return await modal.present();
  }
}
