import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapsComponent } from '../maps/maps.component';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
})
export class PruebaPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async verMapa() {
    const modal = await this.modalController.create({
      component: MapsComponent,
    });
    modal.onDidDismiss().then((data) => {console.log(data);});
    return await modal.present();
  }
}
