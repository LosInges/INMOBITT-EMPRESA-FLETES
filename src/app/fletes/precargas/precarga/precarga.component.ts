import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Precarga } from '../../interfaces/precarga';
import { PrecargaService } from '../../services/precarga.service';
import { MueblesService } from 'src/app/services/muebles.service';
import { Direccion } from '../../interfaces/direccion';
import { MapsComponent } from 'src/app/maps/maps.component';

@Component({
  selector: 'app-precarga',
  templateUrl: './precarga.component.html',
  styleUrls: ['./precarga.component.scss'],
})
export class PrecargaComponent implements OnInit {
  @Input() empresa: string;
  fecha: string = new Date().toISOString();
  muebles = this.mueblesService.getMuebles();

  precarga: Precarga = {
    id: '',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cajas_chicas: 0,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cajas_grandes: 0,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cajas_medianas: 0,
    muebles: [],
    empresa: '',
    cliente: '',
    destino: {
      lat: 0,
      lng: 0,
    },
    fecha: '',
    hora: '',
    origen: {
      lat: 0,
      lng: 0,
    },
    telefono: '',
  };

  constructor(
    private precargaService: PrecargaService,
    private modalController: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private mueblesService: MueblesService
  ) {}

  async mostrarAlerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  ngOnInit() {
    this.precarga.empresa = this.empresa;
  }

  registrarPrecarga() {
    if (
      this.precarga.id.trim().length <= 0 ||
      this.precarga.cliente.trim().length <= 0 ||
      this.precarga.telefono.trim().length <= 0 ||
      this.precarga.muebles.length <= 0
    ) {
      this.mostrarAlerta(
        'Error',
        'Campos vacios',
        'No deje espacios en blanco.'
      );
    } else {
      this.precarga.fecha = this.fecha.split('T')[0];
      this.precarga.hora = this.fecha
        .split('T')[1]
        .split('.')[0]
        .substring(0, 5);
      this.precargaService.postPrecarga(this.precarga).subscribe((res) => {
        if (res.results) {
          this.modalController.dismiss(this.precarga);
        } else {
          console.log(res);
        }
      });
    }
  }

  async verPosicion(position: Direccion) {
    const modal = await this.modalController.create({
      component: MapsComponent,
      componentProps: { position },
      cssClass: 'modalGeneral'
    });
  }

  cerrar() {
    this.modalController.dismiss();
  }
}
