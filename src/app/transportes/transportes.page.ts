import { ModalController } from '@ionic/angular';
import { AltaComponent } from './alta/alta.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Transporte } from '../fletes/interfaces/transporte';
import { TransportesService } from '../fletes/services/transportes.service';
import { DetalleComponent } from './detalle/detalle.component';

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

  async abrirDetalle(transporte:Transporte){
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {transporte}
    });
    return await modal.present();
  }


  async abrirRegistro(){
    const modal = await this.modalController.create({
      component: AltaComponent
    });

    return await modal.present();
  }

  eliminar(transporte: Transporte){
    this.transportesService.deleteTransporte(transporte).subscribe((val)=>{
      this.transportes = val.results
      ? this.transportes.filter((t) => t != transporte)
      : this.transportes;
    });
  }


}
