import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { PaqueteComponent } from './paquete/paquete.component';
import { ModalController } from '@ionic/angular';
import { Paquete } from '../interfaces/paquete';
import { InfoPaquetesComponent } from './info-paquetes/info-paquetes.component';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss'],
})
export class PaquetesComponent implements OnInit {
  paquete: Paquete[] = [];

  constructor(
    private router: Router,
    private modalController: ModalController,
  ) {

  }

  ngOnInit() { }

  async altaPaquete() {
    const modal = await this.modalController.create({
      component: PaqueteComponent,
      componentProps: { id: uuidv4() }
    })
    modal.onDidDismiss().then(v => console.log(v))
    return await modal.present();
  }

  async verInformacion(){
    const modal = await this.modalController.create({
      component: InfoPaquetesComponent
    })
    return await modal.present();
  }
}
