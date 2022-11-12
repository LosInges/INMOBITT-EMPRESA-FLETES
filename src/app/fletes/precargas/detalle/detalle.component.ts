import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MueblesService } from 'src/app/services/muebles.service';
import { SessionService } from 'src/app/services/session.service';
import { AltaComponent } from '../../alta/alta.component';
import { Empresa } from '../../interfaces/empresa';
import { Precarga } from '../../interfaces/precarga';

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
    private mueblesService: MueblesService
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
}
