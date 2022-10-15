import { ModalController } from '@ionic/angular';
import { AltaComponent } from './alta/alta.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Transporte } from '../fletes/interfaces/transporte';
import { TransportesService } from '../fletes/services/transportes.service';

@Component({
  selector: 'app-transportes',
  templateUrl: './transportes.page.html',
  styleUrls: ['./transportes.page.scss'],
})
export class TransportesPage implements OnInit, OnDestroy {
  transportes: Transporte[] = [];
  eventosRouter: any;

  constructor(
    private transportesService: TransportesService,
    private router: Router,
    private modalController: ModalController
  ) {
    this.eventosRouter = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.transportesService
      .getTransportes('empresa@mail.com')
      .subscribe((transportes) => (this.transportes = transportes));
  }

  ngOnDestroy() {
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
