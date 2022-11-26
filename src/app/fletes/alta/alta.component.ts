import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { AlertController } from '@ionic/angular';
import { Cargador } from '../interfaces/cargador';
import { CargadoresService } from '../services/cargadores.service';
import { Direccion } from '../interfaces/direccion';
import { Flete } from '../interfaces/flete';
import { FletesService } from '../services/fletes.service';
import { MapsComponent } from 'src/app/maps/maps.component';
import { ModalController } from '@ionic/angular';
import { Precarga } from '../interfaces/precarga';
import { Transporte } from '../interfaces/transporte';
import { TransporteFlete } from '../interfaces/transporte-flete';
import { TransporteFleteService } from '../services/transporte-flete.service';
import { TransportesService } from '../services/transportes.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent implements OnInit, OnChanges {
  @Input() precarga: Precarga;
  @Input() fecha: string;

  transporteFlete: TransporteFlete = {
    flete: '',
    transporte: '',
    cargadores: [],
    paquete: [],
  };
  transportes: Transporte[] = [];
  cargadores: Cargador[] = [];

  detalleFlete: Flete = {
    activo: true,
    id: '',
    empresa: '',
    cliente: '',
    fecha: '',
    hora: '',
    telefono: '',
    destino: {
      lat: 0,
      lng: 0,
    },
    origen: {
      lat: 0,
      lng: 0,
    },
  };

  constructor(
    private modalController: ModalController,
    private transporteServices: TransportesService,
    private cargadoresServices: CargadoresService,
    private fletesServices: FletesService,
    private alertCtrl: AlertController,
    private transporteFletesService: TransporteFleteService
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
    this.detalleFlete.id = this.precarga.id;
    this.detalleFlete.empresa = this.precarga.empresa;
    this.detalleFlete.cliente = this.precarga.cliente;
    this.detalleFlete.destino = this.precarga.destino;
    this.detalleFlete.origen = this.precarga.origen;
    this.detalleFlete.fecha = this.precarga.fecha;
    this.detalleFlete.hora = this.precarga.hora;
    this.detalleFlete.telefono = this.precarga.telefono;
    this.transporteServices
      .getTransportes(this.detalleFlete.empresa)
      .subscribe((transportes) => {
        this.transportes = transportes.filter(
          (transporte) => transporte.activo
        );
      });
    this.cargadoresServices
      .getCargadores(this.detalleFlete.empresa)
      .subscribe((cargadores) => {
        this.cargadores = cargadores;
      });
    this.transporteFlete.flete = this.precarga.id;

    //TransporteFlete
    console.log(this.fecha);
  }

  registrarFlete() {
    if (
      this.detalleFlete.id.trim().length <= 0 ||
      this.detalleFlete.empresa.trim().length <= 0 ||
      this.detalleFlete.cliente.trim().length <= 0 ||
      this.detalleFlete.telefono.trim().length <= 0 ||
      this.transporteFlete.cargadores.length <= 0 ||
      this.transporteFlete.transporte.trim().length <= 0
    ) {
      this.mostrarAlerta(
        'Error',
        'Campos vacios',
        'No deje espacios en blanco.'
      );
    } else {
      this.alertCtrl
        .create({
          header: 'Confirmar',
          subHeader: '¿Desea registrar el flete?',
          message:
            'El transporte seleccionado para esta operacion no podra ser modificado.',
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
                this.transporteFletesService
                  .postTransportesFlete(this.transporteFlete)
                  .subscribe((val) => {
                    if (val.results) {
                      this.fletesServices
                        .postFlete(this.detalleFlete)
                        .subscribe((res) => {
                          if (res.results) {
                            this.modalController.dismiss({ registrado: true });
                          } else {
                            this.mostrarAlerta(
                              'Error',
                              'Error',
                              'No se pudo registrar el flete.'
                            );
                          }
                        });
                    } else {
                      this.mostrarAlerta(
                        'Error',
                        'Error al registrar',
                        'Error al registrar el flete.'
                      );
                    }
                  });
              },
            },
          ],
        })
        .then((a) => a.present());
    }
  }

  async verPosicion(position: Direccion) {
    const modal = await this.modalController.create({
      component: MapsComponent,
      componentProps: { position },
      cssClass: 'modalGeneral',
    });
    return modal.present();
  }

  cerrar() {
    return this.modalController.dismiss();
  }
}
