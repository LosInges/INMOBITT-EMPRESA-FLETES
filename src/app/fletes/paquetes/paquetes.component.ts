import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { PaqueteComponent } from './paquete/paquete.component';
import { ModalController } from '@ionic/angular';
import { Paquete } from '../interfaces/paquete';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss'],
})
export class PaquetesComponent implements OnInit {
  id: string;

  paquete:  Paquete[] = [];

  constructor(
    private router: Router,
    private modalController: ModalController
    ) {

    }

  ngOnInit() {}

  cambiarId() {
    this.id = uuidv4();
    this.router.navigate([this.router.url, this.id, 'items']);
  }

  async altaPaquete(){
    const modal = await this.modalController.create({
      component: PaqueteComponent,
    })
    
    return await modal.present();
  }
}
