import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Precarga } from '../interfaces/precarga';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent implements OnInit {
  @Input() precarga: Precarga
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  cerrar() {
    return this.modalController.dismiss();
  }


}

