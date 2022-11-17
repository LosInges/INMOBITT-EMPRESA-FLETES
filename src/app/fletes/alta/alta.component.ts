import { ModalController } from '@ionic/angular';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Precarga } from '../interfaces/precarga';
import { Flete } from '../interfaces/flete';
import { TransporteFlete } from '../interfaces/transporte-flete';
import { TransportesService } from '../services/transportes.service';
import { CargadoresService } from '../services/cargadores.service';
import { AlertController } from '@ionic/angular';
import { Transporte } from '../interfaces/transporte';
import { Cargador } from '../interfaces/cargador';
import { FletesService } from '../services/fletes.service';
import { TransporteFleteService } from '../services/transporte-flete.service';

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
    empresa: 'empresa@mail.com',
    cliente: '',
    fecha: '',
    hora: '',
    telefono: '',
    destino: {
      calle: '',
      codigopostal: '',
      colonia: '',
      numeroexterior: '',
      numerointerior: '',
      estado: '',
    },
    origen: {
      calle: '',
      codigopostal: '',
      colonia: '',
      numeroexterior: '',
      numerointerior: '',
      estado: '',
    },
  };

  constructor(
    private modalController: ModalController,
    private transporteServices: TransportesService,
    private cargadoresServices: CargadoresService,
    private fletesServices: FletesService,
    private alertCtrl: AlertController,
    private transporteFletesService: TransporteFleteService
  ) { }

  async mostrarAlerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
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
    ){
      this.mostrarAlerta("Error", "Campos vacios", "No deje espacios en blanco.")
    }else{
      this.transporteFletesService
      .postTransportesFlete(this.transporteFlete)
      .subscribe((val) => { });
      this.fletesServices
      .postFlete(this.detalleFlete)
      .subscribe((respuestaFlete) => {
        this.modalController.dismiss({ registrado: true });
      });
    } 
  }

  cerrar() {
    return this.modalController.dismiss();
  }
}
