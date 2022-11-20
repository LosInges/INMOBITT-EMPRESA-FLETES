import { Component, Input, OnInit } from '@angular/core';

import { AltaComponent } from '../../alta/alta.component';
import { Direccion } from '../../interfaces/direccion';
import { Empresa } from '../../interfaces/empresa';
import { MapsComponent } from 'src/app/maps/maps.component';
import { ModalController } from '@ionic/angular';
import { MueblesService } from 'src/app/services/muebles.service';
import { Precarga } from '../../interfaces/precarga';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() fecha: string;
  @Input() precarga: Precarga;
  empresa: string;
  muebles = this.mueblesService.getMuebles();

  constructor(
    private modalControler: ModalController,
    private sessionService: SessionService,
    private mueblesService: MueblesService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.sessionService.get('empresa')?.then((empresa) => {
      this.empresa = empresa;
      //precarga service ..()
    });
  }

  cerrar() {
    this.modalControler.dismiss();
  }

  async abrirRegistroFlete() {
    const modal = await this.modalControler.create({
      component: AltaComponent,
      componentProps: { precarga: this.precarga, fecha: this.fecha },
      cssClass: 'modalGeneral',
    });
    modal.onDidDismiss().then((val) => {
      if (val.data?.registrado) {
        this.modalControler.dismiss(this.precarga);
      }
    });
    return await modal.present();
  }

  async verPosicion(position: Direccion) {
    const modal = await this.modalController.create({
      component: MapsComponent,
      componentProps: { position },
      cssClass: 'modalGeneral',
    });
    return modal.present();
  }

  async elegirLugar(position: Direccion) {
    const modal = await this.modalController.create({
      component: MapsComponent,
      componentProps: { position },
      cssClass: 'modalGeneral',
    });
    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.precarga.origen = res.data.pos;
      }
    });
    return modal.present();
  }


}
