import { Component, OnDestroy, OnInit } from '@angular/core';

import { DetalleComponent } from './detalle/detalle.component';
import { Direccion } from '../interfaces/direccion';
import { Estado } from 'src/app/interfaces/estado';
import { EstadosService } from 'src/app/services/estados.service';
import { MapsComponent } from 'src/app/maps/maps.component';
import { AlertController, ModalController } from '@ionic/angular';
import { MueblesService } from 'src/app/services/muebles.service';
import { Precarga } from '../interfaces/precarga';
import { PrecargaService } from '../services/precarga.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-precargas',
  templateUrl: './precargas.component.html',
  styleUrls: ['./precargas.component.scss'],
})
export class PrecargasComponent implements OnInit, OnDestroy {
  estados: Estado[] = this.estadosService.getEstados();
  precargas: Precarga[];
  eventosRouter: any;
  empresa: string;

  constructor(
    private estadosService: EstadosService,
    private precargaService: PrecargaService,
    private mueblesService: MueblesService,
    private modalControler: ModalController,
    private sessionService: SessionService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.sessionService.get('empresa')?.then((empresa) => {
      this.empresa = empresa;
      this.precargaService.getPrecargas(empresa).subscribe((precargas) => {
        this.precargas = precargas;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.eventosRouter) {
      this.eventosRouter.unsubscribe();
    }
  }
  async abrirDetalle(precarga: Precarga) {
    let hr = Number(precarga.hora.split(':')[0]);
    hr = hr >= 6 ? hr - 6 : hr + 18;

    const fecha = new Date(
      Number(precarga.fecha.split('-')[0]), //AÑO
      Number(precarga.fecha.split('-')[1]) - 1, //MES (INDICE)
      Number(precarga.fecha.split('-')[2]), //DÍA
      hr, //HORA
      Number(precarga.hora.split(':')[1]) //MINUTOS
    );
    precarga.muebles.forEach((mueble) => {
      this.mueblesService.updateMueble(mueble);
    });
    const modal = await this.modalControler.create({
      component: DetalleComponent,
      componentProps: { precarga, fecha: fecha.toISOString() },
      cssClass: 'modalGeneral',
    });
    modal.onDidDismiss().then((val) => {
      if (val.data) {
        this.precargas = this.precargas.filter((p) => precarga !== p);
      }
    });
    return await modal.present();
  }

  cerrar() {
    this.modalControler.dismiss();
  }

  eliminar(precarga: Precarga) {
    this.precargaService
      .deletePrecarga(precarga.empresa, precarga.id)
      .subscribe((val) => {
        if (val.results) {
          this.precargas = this.precargas.filter((p) => precarga !== p);
        } else {
          this.mostrarAlerta(
            'Error',
            'No se pudo eliminar la precarga',
            'Intente de nuevo'
          );
        }
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
