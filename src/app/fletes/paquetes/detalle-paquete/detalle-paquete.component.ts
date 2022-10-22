import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item } from '../../interfaces/item';
import { PaqueteComponent } from '../paquete/paquete.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-detalle-paquete',
  templateUrl: './detalle-paquete.component.html',
  styleUrls: ['./detalle-paquete.component.scss'],
})
export class DetallePaqueteComponent implements OnInit {
  items: Item[] = [] 
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  eliminar(item:Item){}

 async agregarItem(){
    const modal = await this.modalController.create({
      component:PaqueteComponent,
      componentProps: {id:uuidv4()}   
    })
    modal.onDidDismiss().then(v=> console.log(v))
    return await modal.present();
 }


}
