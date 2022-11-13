import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Empresa } from '../../interfaces/empresa';
import { Precarga } from '../../interfaces/precarga';
import { PrecargaService } from '../../services/precarga.service';
import { MueblesService } from 'src/app/services/muebles.service';

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
      calle: 'Lago Ontario',
      codigopostal: '63173',
      colonia: 'Lagos del Country',
      numeroexterior: '10',
      numerointerior: '',
      estado: 'Nayarit',
    },
    fecha: '',
    hora: '',
    origen: {
      calle: 'Av. Tecnologico',
      codigopostal: '63175',
      colonia: 'Lagos del Country',
      numeroexterior: '2595',
      numerointerior: '',
      estado: 'Nayarit',
    },
    telefono: '',
  };

  constructor(
    private precargaService: PrecargaService,
    private modalController: ModalController,
    private mueblesService: MueblesService
  ) {}

  ngOnInit() {
    this.precarga.empresa = this.empresa;
  }

  registrarPrecarga() {
    this.precarga.fecha = this.fecha.split('T')[0];
    this.precarga.hora = this.fecha.split('T')[1].split('.')[0].substring(0, 5);
    this.precargaService.postPrecarga(this.precarga).subscribe((res) => {
      if (res.results) {
        this.modalController.dismiss(this.precarga);
      } else {
        console.log(res);
      }
    });
  }

  cerrar() {
    this.modalController.dismiss();
  }
}
