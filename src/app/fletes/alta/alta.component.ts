import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Precarga } from '../interfaces/precarga';
import { Flete } from '../interfaces/flete';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent implements OnInit {
  @Input() precarga: Precarga;
  @Input() fecha: string; 
  detalleFlete: Flete = {
    activo: true,
    id: '',
    empresa: '',
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
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.detalleFlete.id = this.precarga.id;
    this.detalleFlete.empresa = this.precarga.empresa;
    this.detalleFlete.cliente = this.precarga.cliente;
    this.detalleFlete.destino = this.precarga.destino;
    this.detalleFlete.origen = this.precarga.origen;
    this.detalleFlete.fecha = this.precarga.fecha;
    this.detalleFlete.hora = this.precarga.hora;
    this.detalleFlete.telefono = this.precarga.telefono;
    console.log(this.fecha);
  }
  cerrar() {
    return this.modalController.dismiss();
  }
  

  
}

