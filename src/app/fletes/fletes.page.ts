import { Component, OnInit } from '@angular/core';

import { AltaComponent } from './alta/alta.component';
import { Direccion } from './interfaces/direccion';
import { Flete } from './interfaces/flete';
import { FletesService } from './services/fletes.service';
import { MapsComponent } from '../maps/maps.component';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

//[routerLink]="['/', 'fletes', flete.id, 'paquetes']"

@Component({
  selector: 'app-fletes',
  templateUrl: './fletes.page.html',
  styleUrls: ['./fletes.page.scss'],
})
export class FletesPage implements OnInit {
  eventosRouter: any;
  fletes: Flete[] = [];
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private fletesService: FletesService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.sessionService.get('empresa')?.then((empresa) => {
      this.fletesService.getFletesE(empresa).subscribe((fletes) => {
        this.fletes = fletes;
      });
    });
  }

  async abrirRegistro() {
    const modal = await this.modalController.create({
      component: AltaComponent,
      cssClass: 'modalGeneral',
    });
    return await modal.present();
  }

  eliminar(flete: Flete) {
    this.alertController
      .create({
        header: 'Eliminar',
        subHeader: '¿Está seguro de eliminar este flete?',
        message: 'Esta acción no se puede deshacer',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {},
          },
          {
            text: 'Eliminar',
            handler: () => {
              this.fletesService.deleteFlete(flete).subscribe((val) => {
                if (val.results) {
                  this.fletes.filter((f) => f !== flete);
                } else {
                  this.mostrarAlerta(
                    'Error',
                    'Error al eliminar',
                    'No se pudo eliminar'
                  );
                }
              });
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  async verPosicion(position: Direccion) {
    const modal = await this.modalController.create({
      component: MapsComponent,
      componentProps: { position },
      cssClass: 'modalGeneral',
    });
    return modal.present();
  }

  navegar(flete: Flete) {
    this.router.navigate(['/', 'fletes', flete.id, 'paquetes']);
  }

  async mostrarAlerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK'],
    });
    return alert.present();
  }
}
