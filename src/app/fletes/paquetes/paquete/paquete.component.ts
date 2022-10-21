import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Paquete } from '../../interfaces/paquete';
import { Flete } from '../../interfaces/flete';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.scss'],
})
export class PaqueteComponent implements OnInit {
  @Input() id: string; 
  @Input() flete: Flete; 

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.id, this.flete);
  }

  cerrar() { this.modalController.dismiss() }
  actualizarCargador() { }
}
