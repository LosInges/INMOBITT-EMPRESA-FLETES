import { ModalController } from '@ionic/angular';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Precarga } from '../interfaces/precarga';
import { Flete } from '../interfaces/flete';
import { TransporteFlete } from '../interfaces/transporte-flete';
import { TransportesService } from '../services/transportes.service';
import { CargadoresService } from '../services/cargadores.service';
import { Transporte } from '../interfaces/transporte';
import { Cargador } from '../interfaces/cargador';

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
    paquete: ''
  }
  transportes: Transporte[] = []
  cargadores: Cargador[] = []

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


  constructor(private modalController: ModalController,
    private transporteServices: TransportesService,
    private cargadoresServices: CargadoresService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
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
    this.transporteServices.getTransportes(this.detalleFlete.empresa).subscribe(transportes => {
      this.transportes = transportes
    })
    this.cargadoresServices.getCargadores(this.detalleFlete.empresa).subscribe( cargadores =>{
      this.cargadores = cargadores
    }

    )
    //TransporteFlete
    console.log(this.fecha);
  }
  cerrar() {
    return this.modalController.dismiss();
  }



}

