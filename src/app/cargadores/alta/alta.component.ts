
import { ModalController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Cargador } from 'src/app/fletes/interfaces/cargador';
import { CargadoresService } from 'src/app/fletes/services/cargadores.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss'],
})
export class AltaComponent implements OnInit, OnDestroy {
  apellido1 = '';
  apellido2 = '';
  eventosRouter: any;
  cargador: Cargador = {
    rfc: '',
    nombre: '',
    apellido: '',
    password: '',
    telefono: '',
    foto: '',
    empresa: 'empresa@mail.com',
  };

  constructor(
    private cargadoresService: CargadoresService,
    private router: Router,
    private modalController: ModalController
  ) {
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

  registrarCargador() {
    this.cargador.apellido = this.apellido1 + ' ' + this.apellido2;
    this.cargadoresService.postCargador(this.cargador).subscribe((res) => {
      this.cargador = {
        rfc: '',
        nombre: '',
        apellido: '',
        password: '',
        telefono: '',
        foto: '',
        empresa: 'empresa@mail.com',
      };
      this.router.navigate(['/cargadores']);
    });
  }

}
