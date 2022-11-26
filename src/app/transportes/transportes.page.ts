import { AlertController, ModalController } from '@ionic/angular';
import { AltaComponent } from './alta/alta.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Transporte } from '../fletes/interfaces/transporte';
import { TransportesService } from '../fletes/services/transportes.service';
import { DetalleComponent } from './detalle/detalle.component';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-transportes',
  templateUrl: './transportes.page.html',
  styleUrls: ['./transportes.page.scss'],
})
export class TransportesPage implements OnInit, OnDestroy {
  transportes: Transporte[] = [];
  eventosRouter: any;
  empresa: string;

  constructor(
    private transportesService: TransportesService,
    private router: Router,
    private modalController: ModalController,
    private sessionService: SessionService,
    private alertController: AlertController
  ) {
    this.eventosRouter = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.sessionService.get('empresa')?.then((empresa) => {
      this.empresa = empresa;
      this.transportesService
        .getTransportes(empresa)
        .subscribe((transportes) => (this.transportes = transportes));
    });
  }

  ngOnDestroy() {
    if (this.eventosRouter) {
      this.eventosRouter.unsubscribe();
    }
  }

  async abrirDetalle(transporte: Transporte) {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: { transporte },
      cssClass: 'modalGeneral',
    });
    modal.onDidDismiss().then((val) => {
      if (val.data.actualizado) {
        this.transportes.filter((t) => t === transporte)[0] =
          val.data.transporte;
      }
    });
    return await modal.present();
  }

  async abrirRegistro() {
    const modal = await this.modalController.create({
      component: AltaComponent,
      componentProps: { empresa: this.empresa },
      cssClass: 'modalGeneral',
    });
    modal.onDidDismiss().then((val) => {
      if (val.data) {
        this.transportes.push(val.data);
      } else {
        console.log(val);
      }
    });
    return await modal.present();
  }

  async eliminar(transporte: Transporte) {
    const alerta = await this.alertController.create({
      header: 'Eliminar',
      subHeader: '¿Está seguro de eliminar este transporte?',
      message:
        'Esta acción puede dañar la integridad de los datos. Antes de realizarla certifíquese de que no se encuentre en uso.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.transportesService
              .deleteTransporte(transporte)
              .subscribe((val) => {
                if (val.results) {
                  this.transportes = this.transportes.filter(
                    (t) => t.matricula !== transporte.matricula
                  );
                } else {
                  this.alertController
                    .create({
                      header: 'Error',
                      message: 'No se ha podido eliminar el transporte',
                      buttons: ['Aceptar'],
                    })
                    .then((a) => {
                      a.present();
                    });
                }
              });
          },
        },
      ],
    });
    return alerta.present();
  }
}
