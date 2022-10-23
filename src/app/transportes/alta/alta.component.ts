import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transporte } from 'src/app/fletes/interfaces/transporte';
import { TransportesService } from 'src/app/fletes/services/transportes.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent implements OnInit {
  eventosRouter: any;
  transporte: Transporte = {
    matricula: '',
    capacidad: 0,
    empresa: 'empresa@mail.com',
    activo: true,
  };

  constructor(
    private transportesService: TransportesService,
    private modalController: ModalController
  ) { }

  ngOnInit() { console.log() }

  cerrar() {
    return this.modalController.dismiss();
  }

  registrarTransporte() {
    this.transportesService
      .postTransporte(this.transporte)
      .subscribe((transporte) => this.modalController.dismiss(this.transporte));
  }
}
