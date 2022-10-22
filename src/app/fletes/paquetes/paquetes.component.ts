import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { ModalController } from '@ionic/angular';
import { TransporteFlete } from '../interfaces/transporte-flete';
import { TransporteFleteService } from '../services/transporte-flete.service';


@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss'],
})
export class PaquetesComponent implements OnInit {
  paquetes: string[] = [];
  transporteFlete: TransporteFlete = {
    flete: '',
    transporte: '',
    paquete: [],
    cargadores: [],
  }

  constructor(
    private router: Router,
    private modalController: ModalController,
    private activedRoute: ActivatedRoute,
    private transporteFleteService: TransporteFleteService
  ) {

  }

  ngOnInit() {
    this.activedRoute.params.subscribe((params) => {
      //Solicitar info de transporte flete y guardar los paquetes de la respuesta en paquetes
      this.transporteFleteService.getTransportesFlete(params.id).subscribe(transporteFlete => {
        this.transporteFlete = transporteFlete
        this.paquetes = transporteFlete.paquete
      })
    })

  }

  async altaPaquete() {
    if (this.paquetes) {
      this.paquetes.push(uuidv4())
    }
    else {
      this.paquetes = [uuidv4()]
      this.transporteFlete.paquete = this.paquetes
    }
    this.transporteFleteService.postTransportesFlete(this.transporteFlete).subscribe()
    //Actualizar transporteFlete
    // const modal = await this.modalController.create({
    //   component: PaqueteComponent,
    //   componentProps: { id: uuidv4() }
    // })
    // modal.onDidDismiss().then(v => console.log(v))
    // return await modal.present();
  }
}
