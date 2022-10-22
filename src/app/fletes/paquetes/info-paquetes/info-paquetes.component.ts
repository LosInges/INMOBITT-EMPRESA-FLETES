import { Component, Input, OnInit } from '@angular/core';
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
  @Input() flete: string
  cargadores: string[] = [];
  transporte: string
  cargadoresEmpresa: string[] = []

  constructor(
    private modalController: ModalController,
    private transporteFletesService: TransporteFleteService
  ) { }


  ngOnInit() {
    this.transporteFletesService
    .getTransportesFlete(this.flete).subscribe((transporteFlete)=>{
      this.transporte = transporteFlete.transporte;
      this.cargadores = transporteFlete.cargadores
    });
  }

  cerrar(){
    return this.modalController.dismiss()
  }



  eliminar(cargador: string){

  }

  agregar(){

  }

}
