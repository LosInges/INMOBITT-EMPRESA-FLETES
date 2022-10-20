import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AltaComponent } from '../../alta/alta.component';
import { Empresa } from '../../interfaces/empresa';
import { Precarga } from '../../interfaces/precarga';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() fecha: string
  @Input() empresas: Empresa[]
  @Input() precarga: Precarga


  constructor(
    private modalControler: ModalController,

  ) { }

  ngOnInit() {
    console.log(this.precarga)
  }

  cerrar(){
    this.modalControler.dismiss()
  }

 async abrirRegistroFlete(){
    const modal= await this.modalControler.create({
      component: AltaComponent,
      componentProps: { precarga: this.precarga}
    })
    return await modal.present()
  }

}
