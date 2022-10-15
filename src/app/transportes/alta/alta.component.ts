import { ModalController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Transporte } from 'src/app/fletes/interfaces/transporte';
import { TransportesService } from 'src/app/fletes/services/transportes.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent implements OnInit, OnDestroy  {
  eventosRouter: any;
  transporte: Transporte = {
    matricula: '',
    capacidad: 0,
    empresa: 'empresa@mail.com',
    activo: true,
  };

  constructor(
    private transportesService: TransportesService,
    private router: Router,
    private modalController: ModalController
    ){
      this.eventosRouter = this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.ngOnInit();
        }
      });
    }

  ngOnInit() {}

  cerrar() {
    return this.modalController.dismiss();
  }
  ngOnDestroy(): void {
    if (this.eventosRouter) {
      this.eventosRouter.unsubscribe();
    }
  }

  registrarTransporte() {
    this.transportesService
      .postTransporte(this.transporte)
      .subscribe((transporte) => console.log(transporte));
  }
}
