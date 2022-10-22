import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cargador } from '../../interfaces/cargador';
import { Transporte } from '../../interfaces/transporte';
import { TransporteFleteService } from '../../services/transporte-flete.service';
@Component({
  selector: 'app-info-paquetes',
  templateUrl: './info-paquetes.component.html',
  styleUrls: ['./info-paquetes.component.scss'],
})
export class InfoPaquetesComponent implements OnInit {
  cargadores: Cargador[] = [];
  transporte: Transporte

  constructor(
    private modalController: ModalController,
    private transporteFletes: TransporteFleteService
  ) { }

  ngOnInit() {}

  cerrar(){
    return this.modalController.dismiss()
  }

  eliminar(){
  }

  agregar(){

  }

}
